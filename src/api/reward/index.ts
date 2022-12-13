import { BigNumber } from 'ethers'

import Contracts from '@api/contract'

import { REWARD_ADDRESS } from '@api/config'

import { CSTLEVEL } from '@constants/exam'

export interface SourceDaoReward {
  id: BigNumber       // SBT id
  qlevel: keyof typeof CSTLEVEL      // 考试的难度
  qtype: number       // 考试的类型
  score: number       // 考试分数
  time: BigNumber     // 考试时间，使用区块时间
  owner: string       // 考试人
  examId: string      // 试卷ID
}

class Reward extends Contracts {

  address = REWARD_ADDRESS

  writeAbi = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_examId",
          "type": "string"
        },
        {
          "internalType": "uint8[]",
          "name": "_answers",
          "type": "uint8[]"
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
      "name": "checkAndTryReward",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
  ]

  readAbi = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "getSBTMeta",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "uint8",
              "name": "qlevel",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "qtype",
              "type": "uint8"
            },
            {
              "internalType": "uint16",
              "name": "score",
              "type": "uint16"
            },
            {
              "internalType": "uint256",
              "name": "time",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "examId",
              "type": "string"
            }
          ],
          "internalType": "struct Reward.SourceDaoReward",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_examId",
          "type": "string"
        }
      ],
      "name": "getSBTMetaByExam",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "uint8",
              "name": "qlevel",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "qtype",
              "type": "uint8"
            },
            {
              "internalType": "uint16",
              "name": "score",
              "type": "uint16"
            },
            {
              "internalType": "uint256",
              "name": "time",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "examId",
              "type": "string"
            }
          ],
          "internalType": "struct Reward.SourceDaoReward",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "getTokensByUser",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
  ]

  async checkAndTryReward(examId: string, answers: number[], type: number, level: number) {
    return this.writeContract('checkAndTryReward', examId, answers, type, level)
  }

  async getSBTMetaByExam(examId: string) {
    return this.readContract('getSBTMetaByExam', examId)
  }

  async getTokensByUser(address: string) {
    return this.readContract<BigNumber[]>('getTokensByUser', address)
  }

  async getSBTMeta(tokenId: number) {
    return this.readContract<SourceDaoReward>('getSBTMeta', tokenId)
  }

}

let instance

export default (() => {
  if (instance) return instance
  instance = new Reward()
  return instance
})()