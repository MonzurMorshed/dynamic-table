import { SetListItem, SetTotal } from '../redux/state-slice/listSlice';
import { HideLoader, ShowLoader } from '../redux/state-slice/settingsSlice';
import store from '../redux/store/store';
import { ErrorToast } from '../helpers/formHelper';
import axios from 'axios';

const BaseURL = "http://localhost:5001/api/v1"

export async function GetList(pageNo, perPage, searchKeyword, key, sortVal) {
    
    let URL = `${BaseURL}/List/${pageNo}/${perPage}/${searchKeyword}/${key}/${sortVal}`;

    store.dispatch(ShowLoader());

    try {
        const result = await axios.get(URL);
        store.dispatch(HideLoader());
        if(result.status === 200 && result.data['status'] === "success") {
            if(result.data['data'][0]['Rows'].length > 0) {
                store.dispatch(SetListItem(result.data['data'][0]['Rows']));
                store.dispatch(SetTotal(result.data['data'][0]['Total'][0]['count']));
            } else {
                store.dispatch(SetListItem([]));
                store.dispatch(SetTotal(0));
                ErrorToast("No data found");
            }
        } else {
            ErrorToast("Something went wrong");
        }
    } catch (e) {
        ErrorToast("Something went wrong")
        store.dispatch(HideLoader());
    }

}