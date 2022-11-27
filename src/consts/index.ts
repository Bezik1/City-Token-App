import CONTRACT from '../artifacts/contracts/CityToken.sol/CityToken.json'
import { Contract } from "ethers"

export const CONTRACT_ADDRESS='0xe4aB528ff0CE0BfE7724074937983c65cb6E3386'
export const REACT_APP_GOERLI_RPC_URL='https://goerli.infura.io/v3/31e604e14e374385b21435e6fd686d4d'
export const contract = new Contract(CONTRACT_ADDRESS, CONTRACT.abi)