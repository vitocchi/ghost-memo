import { utils, eeConstants } from "enigma-js";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// wrapper of enigma-js-client
class EnigmaClient {
    constructor(enigma, accounts, contract) {
        this.enigma = enigma;
        this.accounts = accounts;
        this.contract = contract;
        this.computeTask = this.computeTask.bind(this);
        this.taskGasLimit = 1000000;
        this.taskGasPx = utils.toGrains(1);
    }
    async computeTask(taskFn, taskArgs) {
        console.log('Task start');
        console.log(taskFn);
        console.log(taskArgs);
        let task = await new Promise((resolve, reject) => {
            this.enigma.computeTask(taskFn, taskArgs, this.taskGasLimit, this.taskGasPx, this.accounts[0], this.contract)
                .on(eeConstants.SEND_TASK_INPUT_RESULT, (result) => resolve(result))
                .on(eeConstants.ERROR, (error) => reject(error));
        });
        console.log('Task pending');
        while (task.ethStatus === 1) {
            task = await this.enigma.getTaskRecordStatus(task);
            await sleep(1000);
        }
        if (task.ethStatus === 2 ) {
            task = await new Promise((resolve, reject) => {
                this.enigma.getTaskResult(task)
                    .on(eeConstants.GET_TASK_RESULT_RESULT, (result) => resolve(result))
                    .on(eeConstants.ERROR, (error) => reject(error));
            });
            console.log('Task succeeded');
            return await this.enigma.decryptTaskResult(task);
        } else {
            console.log('Task failed');
        }
        ;
    }
}

export default EnigmaClient