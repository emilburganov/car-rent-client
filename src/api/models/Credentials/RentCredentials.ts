import {Dayjs} from "dayjs";

export interface RentCredentials {
    car_id: number,
    user_id: number,
    start: Dayjs | null,
    end: Dayjs | null,
}
