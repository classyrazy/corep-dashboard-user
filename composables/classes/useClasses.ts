import moment from "moment";
import Graph from "~~/libs/avanda";
import { useUserStore } from "~~/store/user";
import { useAlert } from "../core/useToast";
import { v5 as uuidv5, v4 as uuidv4 } from 'uuid'

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
const config = useRuntimeConfig()
const router = useRouter();

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
    let NAME_SPACE = config.NAME_SPACE
    return uuidv5(JSON.stringify(num), NAME_SPACE)
  }
  function routeToClassWithEventId(eventId: number) {
    let uuid = encodeNumber(eventId);
    console.log(eventId);
    router.push(`/classes/${uuid}-${eventId}`);
  }
  return {
    getClassData,
    transformClassdata,
    routeToClassWithEventId
  };
};
