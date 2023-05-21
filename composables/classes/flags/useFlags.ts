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
  function createFlagMessage(message: string, courseId: number) {
    let { submitData, loading, data } = useFormRequest(
      "CourseFlag/createNewFlagMessage",
      null,
      {
        message,
        courseId,
      },
      (data: any) => {
        console.log(data);
        if (data) {
          console.log(data);
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
    submitData();
  }
  async function getAllFlags(courseId: string) {
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
    flags.value = reqData;
  }
  const loading = ref(false);
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
      watcher.listen((res: any) => {
        console.log(res.getData());
        flags.value = res.getData();
      });
    } catch (error) {
      useAlert().openAlert({
        type: "ERROR",
        msg: "Sorry an error occured😣, \n Try refreshing the page",
      });
    } finally {
      loading.value = false;
    }
  }
  return {
    createFlagMessage,
    getCurrentViewingParamId,
    getAllFlags,
    flags,
    watchCourseFlags,
    loading,
  };
};
