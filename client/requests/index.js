import request from 'superagent';
import { actionReq } from '../actions/index.js';

//запрос настроек таблицы по name
export const getSetting = (dispatch, name) => {

        request
            .get(`/setting/${name}`)
            .end((err,res) => {
                if (err) dispatch(actionReq.error(err));
                //приходит массив из 1 объекта, нам объект и нужен
                dispatch(actionReq.SettingOK(res.body[0]));
            })
};

//запрос итого таблицы по name
export const getAmount = (dispatch, name) => {

        request
            .get(`/amount/${name}`)
            .end((err,res) => {
                if(err) dispatch(actionReq.error(err));
                dispatch(actionReq.AmountOK(res.body.amount));
            })
};

//запрос body таблицы по name
export const getBody = (dispatch, name) => {
        request
            .get(`/body/${name}`)
            .end((err,res) => {
                if (err) dispatch(actionReq.error(err));
                dispatch(actionReq.BodyOK(res.body))
            })
};

//отправка изменений на сервер
export const sendData = (dispatch, data) => {
    request
        .post('/data')
        .send(data)
        .end((err, res) => {
            if (err) dispatch(actionReq.error(err));
            //на правку изменненной строки
            dispatch(actionReq.SendOK(res.body[0]));
            //если у вторго объекта, сумм не ноль, необх добавить новую строку
            if (res.body[1].sum !== null) dispatch(actionReq.NewStr(res.body[1]));
        })
};

//запрос отчета
export const getReport = (dispatch) => {
    request
        .get('/log')
        .end((err,res) => {
            if (err) dispatch(actionReq.error(err));
            dispatch(actionReq.ReportOK(res.body))
        })
};

//отправка из формы данных modul и incass
export const getOper = (modul, incass) => {
    const str = "?modul="+modul+"&incass="+incass;
    request
        .get(`/oper/${str}`)
        .end((err,res) => {
            if (err) console.log(err);
            console.log('ответ ', res.body)
        })
};