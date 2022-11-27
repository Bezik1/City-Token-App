import { useLogs } from "@usedapp/core";
import { BigNumber } from "ethers";
import { useMemo } from "react";
import { Vector3 } from "three";

import { contract } from "../consts";
import { Building } from "../types";
import { HexToStrColor } from "../utils/ColorUtils";

export const useCity = () => {
  const logs = useLogs({
    contract,
    event: "NewBuilding",
    args: [null],
  });

  const buildings = useMemo(() => {
    return (
      logs?.value?.map((log) => {
        const {
            ownerName,
            message,
            position,
            height,
            color
        } = log.data

        const [x, y ,z]: number[]= position.map((pos: BigNumber) => pos.toNumber())
        const positionVector = new Vector3(x, y, z)

        const floor: Building = {
          ownerName: ownerName,
          message: message,
          position: positionVector,
          height: height.toNumber(),
          color: HexToStrColor(color._hex),
        };
        return floor;
      }) || []
    );
  }, [logs?.value]);

  return {
    buildings,
  };
};