import moment from "moment";
import Graph from "~~/libs/avanda";
import { useUserStore } from "~~/store/user";
import { useAlert } from "../core/useToast";
import { v5 as uuidv5, v4 as uuidv4 } from "uuid";
import { Ref } from "nuxt/dist/app/compat/capi";

export interface TimeTableItem {
  id: number;
  code: string;
  title: string;
  unit: number;
  color: string;
  day: string;
  type: string;
  location: string;
  locationtype: string;
  start: string;
  end: string;
  optionalCode?: string;
  courseId: number;
  level: string;
  isBorrowed: boolean;
}
export interface Details {
  id: number;
  course_id: number;
  user_id: number;
  day: "1" | "2" | "3" | "4" | "5" | "6" | "7";
  type: "course" | "user";
  course_type: "local" | "global";
  location_type: "physical" | "online";
  location: string;
  start_time: string;
  end_time: string;
  department_id: number;
  level_id: number;
  createdAt: string;
  updatedAt: string;
  is_borrowed: boolean;
  status: string;
}
const config = useRuntimeConfig();
const router = useRouter();

export const timeDiff = ref("");
export const useClasses = () => {
  function transformClassdata(data: any) {
    console.log(data);
  }

  async function getClassData(CourseIdPassed: number) {
    const classDetails = ref<TimeTableItem>();
    try {
      let req = await new Graph()
        .service("Schedule/getSchedule")
        .fetch(
          "*",
          new Graph().service("Course/getCourseFromParent").as("course")
        )
        .params({ course_id: CourseIdPassed })
        .get();
      classDetails.value = req.getData();
      return classDetails;
    } catch (error: any) {
      useAlert().openAlert({ type: "ERROR", msg: error.getMsg() });
    }
  }
  function encodeNumber(num: number) {
    let NAME_SPACE = config.NAME_SPACE;
    return uuidv5(JSON.stringify(num), NAME_SPACE);
  }
  function routeToClassWithEventId(eventId: number, courseId: number) {
    let uuid = encodeNumber(eventId);
    console.log(eventId, uuid);
    useRouter().push(`/classes/${uuid}-${eventId}-${JSON.stringify(courseId)}`);
  }
  const scheudleUrlDetails = computed(() => {
    let courseId = useRoute().params.id as string;
    const parts = courseId.split("-");
    const scheduleId = parseInt(parts[parts.length - 2]);
    const courseIdParam = parseInt(parts[parts.length - 1]);
    return { scheduleId, courseId: courseIdParam };
  });
  let loadingCourseDet = ref(false);
  async function getCourseNameAndColor(courseId: number) {
    loadingCourseDet.value = true;
    try {
      let req = await new Graph()
        .service("Course/get")
        .select("id", "code", "optional_code", "title", "color")
        .params({ courseId })
        .get();
      return req.getData();
    } catch (error: any) {
      useAlert().openAlert({ type: "ERROR", msg: error });
    } finally {
      loadingCourseDet.value = false;
    }
  }
  let loadingScheduleDet = ref(false);
  const scheduleDetail = ref(null) as Ref<Details | null>;

  async function getScheduleDetails(scheduleId: number) {
    loadingScheduleDet.value = true;
    try {
      let req = await new Graph()
        .service("Schedule/get")
        .params({ scheduleId })
        .get();
      scheduleDetail.value = req.getData();
      let start = moment(scheduleDetail.value?.start_time, "HH:mm");
      let end = moment(scheduleDetail.value?.end_time, "HH:mm");
      let duration = moment.duration(end.diff(start));
      let hours = duration.hours();
      let minutes = duration.minutes();
      console.log(duration, "duration", hours, minutes);
      if (minutes === 0) {
        timeDiff.value = `${hours}${hours >1 ? "hrs" : "hr"}`;
      } else {
        timeDiff.value = `${hours}hrs${minutes}min`;
      }
      console.log(timeDiff.value);
    } catch (error: any) {
      useAlert().openAlert({ type: "ERROR", msg: error });
      return null;
    } finally {
      loadingScheduleDet.value = false;
    }
  }
  return {
    getClassData,
    transformClassdata,
    routeToClassWithEventId,
    getCourseNameAndColor,
    loadingCourseDet,
    getScheduleDetails,
    loadingScheduleDet,
    scheudleUrlDetails,
    scheduleDetail,
    timeDiff,
  };
};
