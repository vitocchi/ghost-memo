const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const {Enigma, utils, eeConstants} = require('enigma-js/node');

var EnigmaContract;
if(typeof process.env.SGX_MODE === 'undefined' || (process.env.SGX_MODE != 'SW' && process.env.SGX_MODE != 'HW' )) {
    console.log(`Error reading ".env" file, aborting....`);
    process.exit();
} else if (process.env.SGX_MODE == 'SW') {
  EnigmaContract = require('../build/enigma_contracts/EnigmaSimulation.json');
} else {
  EnigmaContract = require('../build/enigma_contracts/Enigma.json');
}
const EnigmaTokenContract = require('../build/enigma_contracts/EnigmaToken.json');


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let enigma = null;

contract("GhostMemo", accounts => {
  before(function() {
    enigma = new Enigma(
      web3,
      EnigmaContract.networks['4447'].address,
      EnigmaTokenContract.networks['4447'].address,
      'http://localhost:3333',
      {
        gas: 4712388,
        gasPrice: 100000000000,
        from: accounts[0],
      },
    );
    enigma.admin();
    enigma.setTaskKeyPair('cupcake');
  })

  let task;
  it('should execute regisotr task', async () => {
    let taskFn = 'registor(string,string)';
    let taskArgs = [
      ['id', 'string'],
      ['pass', 'string'],
    ];
    let taskGasLimit = 1000000;
    let taskGasPx = utils.toGrains(1);
    const contractAddr = fs.readFileSync('test/ghost_memo.txt', 'utf-8');
    task = await new Promise((resolve, reject) => {
      enigma.computeTask(taskFn, taskArgs, taskGasLimit, taskGasPx, accounts[0], contractAddr)
        .on(eeConstants.SEND_TASK_INPUT_RESULT, (result) => resolve(result))
        .on(eeConstants.ERROR, (error) => reject(error));
    });
    // Task should be pending
    task = await enigma.getTaskRecordStatus(task);
    expect(task.ethStatus).to.equal(1);

    do {
      await sleep(1000);
      task = await enigma.getTaskRecordStatus(task);
      process.stdout.write('Waiting. Current Task Status is '+task.ethStatus+'\r');
    } while (task.ethStatus === 1);
    expect(task.ethStatus).to.equal(2);
    process.stdout.write('Completed. Final Task Status is '+task.ethStatus+'\n');
  });

  it('should execute save_memo task', async () => {
    let taskFn = 'save_memo(string,string,string)';
    let taskArgs = [
      ['id', 'string'],
      ['pass', 'string'],
      ['memo', 'string'],
    ];
    let taskGasLimit = 1000000;
    let taskGasPx = utils.toGrains(1);
    const contractAddr = fs.readFileSync('test/ghost_memo.txt', 'utf-8');
    task = await new Promise((resolve, reject) => {
      enigma.computeTask(taskFn, taskArgs, taskGasLimit, taskGasPx, accounts[0], contractAddr)
        .on(eeConstants.SEND_TASK_INPUT_RESULT, (result) => resolve(result))
        .on(eeConstants.ERROR, (error) => reject(error));
    });
    task = await enigma.getTaskRecordStatus(task);
    expect(task.ethStatus).to.equal(1);
    do {
      await sleep(1000);
      task = await enigma.getTaskRecordStatus(task);
      process.stdout.write('Waiting. Current Task Status is '+task.ethStatus+'\r');
    } while (task.ethStatus === 1);
    expect(task.ethStatus).to.equal(2);
  });

  it('should execute get_memo task', async () => {
    let taskFn = 'get_memo(string,string)';
    let taskArgs = [
      ['id', 'string'],
      ['pass', 'string'],
    ];
    let taskGasLimit = 1000000;
    let taskGasPx = utils.toGrains(1);
    const contractAddr = fs.readFileSync('test/ghost_memo.txt', 'utf-8');
    task = await new Promise((resolve, reject) => {
      enigma.computeTask(taskFn, taskArgs, taskGasLimit, taskGasPx, accounts[0], contractAddr)
        .on(eeConstants.SEND_TASK_INPUT_RESULT, (result) => resolve(result))
        .on(eeConstants.ERROR, (error) => reject(error));
    });
    task = await enigma.getTaskRecordStatus(task);
    expect(task.ethStatus).to.equal(1);
    do {
      await sleep(1000);
      task = await enigma.getTaskRecordStatus(task);
      process.stdout.write('Waiting. Current Task Status is '+task.ethStatus+'\r');
    } while (task.ethStatus != 2);
    expect(task.ethStatus).to.equal(2);
    task = await new Promise((resolve, reject) => {
      enigma.getTaskResult(task)
        .on(eeConstants.GET_TASK_RESULT_RESULT, (result) => resolve(result))
        .on(eeConstants.ERROR, (error) => reject(error));
    });
    expect(task.engStatus).to.equal('SUCCESS');
    task = await enigma.decryptTaskResult(task);
    task = await enigma.decryptTaskResult(task);
    expect(enigma.web3.eth.abi.decodeParameter('string', task.decryptedOutput)).to.equal('memo');
  });

  it('should execute get_all_ids task', async () => {
    let taskFn = 'get_all_ids()';
    let taskArgs = [
    ];
    let taskGasLimit = 1000000;
    let taskGasPx = utils.toGrains(1);
    const contractAddr = fs.readFileSync('test/ghost_memo.txt', 'utf-8');
    task = await new Promise((resolve, reject) => {
      enigma.computeTask(taskFn, taskArgs, taskGasLimit, taskGasPx, accounts[0], contractAddr)
        .on(eeConstants.SEND_TASK_INPUT_RESULT, (result) => resolve(result))
        .on(eeConstants.ERROR, (error) => reject(error));
    });
    task = await enigma.getTaskRecordStatus(task);
    expect(task.ethStatus).to.equal(1);
    do {
      await sleep(1000);
      task = await enigma.getTaskRecordStatus(task);
      process.stdout.write('Waiting. Current Task Status is '+task.ethStatus+'\r');
    } while (task.ethStatus != 2);
    expect(task.ethStatus).to.equal(2);
    task = await new Promise((resolve, reject) => {
      enigma.getTaskResult(task)
        .on(eeConstants.GET_TASK_RESULT_RESULT, (result) => resolve(result))
        .on(eeConstants.ERROR, (error) => reject(error));
    });
    expect(task.engStatus).to.equal('SUCCESS');
    task = await enigma.decryptTaskResult(task);
    task = await enigma.decryptTaskResult(task);
    expect(enigma.web3.eth.abi.decodeParameter('string', task.decryptedOutput)).to.equal('id');
  });
})
