import { makeObservable, observable, action} from 'mobx'
import { Service } from "typedi";

@Service()
export class UserStore {
    @observable
    public timer = 100;

    constructor(){
        makeObservable(this)
    }

    @action
    public updateTimer() {
        this.timer = 12312321321
    }

}
