import { ethers } from 'ethers'

import store from '@store/index'

import { getProvider } from '@utils/wallets'

// import { useAppSelector } from '@store/index'

// interface ContractABI {
//   writeAbi?: ethers.ContractInterface
//   readAbi?: ethers.ContractInterface
// }
// interface ContractResult {
//   writeContract: ethers.Contract
//   readContract: ethers.Contract
// }

interface WriteContractResult {
  wait: () => Promise<void>
}

// export default async (
//   address: string,
//   { writeAbi = [], readAbi = [] }: ContractABI = {}
// ): Promise<ContractResult> => {
 
//   const { currentWallet } = useAppSelector((state) => state.wallet)

//   const provider = currentWallet
//     ? await getProvider(currentWallet)
//     : new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com/')

//   if (!provider) throw Error('wallet unconnet')

//   const signer = provider.getSigner()

//   const writeContract = new ethers.Contract(address, writeAbi, signer)

//   const readContract = new ethers.Contract(address, readAbi, provider)

//   console.log('contract');
  

//   return { writeContract, readContract }
// }

export default class Contracts {
  protected address = ''
  protected writeAbi: ethers.ContractInterface = []
  protected readAbi: ethers.ContractInterface = []

  private _writeContract: ethers.Contract | undefined
  private _readContract: ethers.Contract | undefined

  constructor() {
    (async () => {
      const { currentWallet } = store.getState().wallet
      let provider

      try {
        provider = await getProvider(currentWallet)
      } catch (error) {
        provider = new ethers.providers.JsonRpcProvider(
          'https://rpc-mumbai.maticvigil.com/'
        )
      }

      if (provider) {
        const signer = provider.getSigner()

        this._writeContract = new ethers.Contract(
          this.address,
          this.writeAbi,
          signer
        )

        this._readContract = new ethers.Contract(
          this.address,
          this.readAbi,
          provider
        )
      }
    })()
  }

  protected writeContract(
    api: string,
    ...arg: unknown[]
  ): Promise<WriteContractResult> {
    if (!this._writeContract) throw Error('wallet unconnet')
    return this._writeContract[api](...arg)
  }

  protected readContract<T>(api: string, ...arg: unknown[]): T {
    if (!this._readContract) throw Error('wallet unconnet')
    return this._readContract[api](...arg)
  }
}
