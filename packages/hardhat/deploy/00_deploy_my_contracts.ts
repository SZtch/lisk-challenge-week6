import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deploy } = hre.deployments;
  const { deployer } = await hre.getNamedAccounts();

  console.log("🚀 Deploying MyToken and MyNFT...");

  const token = await deploy("MyToken", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });

  const nft = await deploy("MyNFT", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });

  console.log(`✅ MyToken deployed at: ${token.address}`);
  console.log(`✅ MyNFT deployed at: ${nft.address}`);
};

export default func;
func.tags = ["MyToken", "MyNFT"];
