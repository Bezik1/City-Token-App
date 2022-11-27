import { useContractFunction } from "@usedapp/core";
import { contract } from "../consts";

export const useCreateBuilding = () => {
  const { state, send } = useContractFunction(contract, "createBuilding");
  const loading =
    state.status === "PendingSignature" || state.status === "Mining";
  const success = state.status === "Success";
  const error = state.status === "Fail" || state.status === "Exception";
  return {
    loading,
    success,
    error,
    send,
  };
};
