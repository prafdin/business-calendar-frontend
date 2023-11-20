import { MonthDictionary, WeekDaysDictionary } from "../models/common.model";

export const BACKEND_SERVER_URL = "http://localhost:5077" // Для деплоя - "/api"

export const monthsDictionary: MonthDictionary = {
    1: "Янв",
    2: "Фев",
    3: "Март",
    4: "Апр",
    5: "Май",
    6: "Июнь",
    7: "Июль",
    8: "Авг",
    9: "Сент",
    10: "Окт",
    11: "Нояб",
    12: "Дек"
};

export const weekDaysDictionary: WeekDaysDictionary = {
    1: "Пн",
    2: "Вт",
    3: "Ср",
    4: "Чт",
    5: "Пт",
    6: "Сб",
    0: "Вс",
};
