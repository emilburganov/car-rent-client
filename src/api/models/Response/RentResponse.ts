import {Dayjs} from "dayjs";

export interface RentResponse {
    id: number,
    car_id: number,
    user_id: number,
    start: Dayjs | null,
    end: Dayjs | null,
}
