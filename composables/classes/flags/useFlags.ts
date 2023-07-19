import Graph from "~~/libs/avanda";
import useFormRequest from "~~/composables/useFormRequest";
import { useAlert } from "~~/composables/core/useToast";
export interface flagCommentType {
  id: number;
  message: string;
  schedule_id: number;
  user_id: number;
  parent_flag_id?: number;
  user: {
    username: string;
    id: number;
    avatar?: string;
  };
}
export const loadingFlags = ref(false);

export const useFlags = () => {
  const flags = ref<flagCommentType[]>([]);
  const getCurrentViewingParamId = computed(() => {
    const idfromUrl = useRoute().params.id as string;
    const parts = idfromUrl.split("-");
    const scheduleId = parts[parts.length - 2];
    const courseIdParam = parseInt(parts[parts.length - 1]);
    return {
      scheduleId,
      courseId: courseIdParam
    };
  });
  let message = ref("");
  let courseId = ref(0);
  let { submitData, loading: loadingCreateNewMessage, data } = useFormRequest(
    "CourseFlag/createNewFlagMessage",
    null,
    {
      message: message,
      courseId: courseId,
    },
    (data: any) => {
      console.log(data);
      if (data) {
        console.log(data);
      }
    },
    (error: any) => {
      useAlert().openAlert({
        type: "ERROR",
        msg: `${error.getMsg() || 'Sorry an error occured😣, \n Try again'} `,
      });
    }
  );
  function createFlagMessage(messageInner: string, courseIdInner: number) {
    message.value = messageInner;
    courseId.value = courseIdInner;
    if (message.value.trim() && courseId.value) {
      submitData();

    }
  }

  async function getAllFlags(courseId: number) {
    loadingFlags.value = true;
    try {
      let req = new Graph()
        .service("CourseFlag/getAllFlagMessage")
        .fetch(
          "*",
          new Graph()
            .service("User/getUserFromParent")
            .select("id", "username")
            .as("user")
        )
        .params({ courseId })
        .get();
      let reqData = (await req).getData();
      loadingFlags.value = false;
      flags.value = reqData;
    } catch (error: any) {
      useAlert().openAlert({
        type: "ERROR",
        msg: `${error.getMsg() || 'Sorry an error occured😣, \n Try refreshing the page'} `,
      });
    } finally {
      loadingFlags.value = false;
    }
  }
  function watchCourseFlags() {
    try {
      let watcher = new Graph()
        .service("CourseFlag/watchCourseFlag")
        .fetch(
          "*",
          new Graph()
            .service("User/getUserFromParent")
            .select("id", "username")
            .as("user")
        )
        .params({ courseId: getCurrentViewingParamId.value.courseId })
        .watch();
      watcher.onOpened(() => {
        getAllFlags(getCurrentViewingParamId.value.courseId)
      });
      watcher.listen((res: any) => {
        let resData = res.getData();
        flags.value.push(resData);

      });
    } catch (error) {
      useAlert().openAlert({
        type: "ERROR",
        msg: "Sorry an error occured😣, \n Try refreshing the page",
      });
    } finally {
    }
  }
  return {
    createFlagMessage,
    getCurrentViewingParamId,
    getAllFlags,
    flags,
    watchCourseFlags,
    loadingCreateNewMessage
  };
};
