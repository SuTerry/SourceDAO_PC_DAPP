import Contracts from '@api/contract'

import { EXAM_ADDRESS } from '@api/config'

class Exam extends Contracts {

  address = EXAM_ADDRESS

  writeAbi = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_examId",
          "type": "string"
        },
        {
          "internalType": "uint8",
          "name": "_type",
          "type": "uint8"
        },
        {
          "internalType": "uint8",
          "name": "_level",
          "type": "uint8"
        }
      ],
      "name": "genExam",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
  ]

  readAbi = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_examId",
          "type": "string"
        }
      ],
      "name": "getExam",
      "outputs": [
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint8",
          "name": "qtype",
          "type": "uint8"
        },
        {
          "internalType": "uint8",
          "name": "qlevel",
          "type": "uint8"
        }
      ],
      "name": "getExaminationDuration",
      "outputs": [
        {
          "internalType": "uint16",
          "name": "",
          "type": "uint16"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]

  async genExam(examId: string, type: number, level: number) {
    return this.writeContract('genExam', examId, type, level)
  }

  async getExam(examId: string) {
    return this.readContract<string[]>('getExam', examId)
  }

  async getExaminationDuration(type: number, level: number) {
    return this.readContract<number>('getExaminationDuration', type, level)
  }

}

let instance

export default (() => {
  if (instance) return instance
  instance = new Exam()
  return instance
})()