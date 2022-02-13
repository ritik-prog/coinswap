require("@nomiclabs/hardhat-waffle");

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/87bbdb3b5d334bf1817dd9932344a906",
      accounts: [
        "6c030e71d9b0c20c7e6b02fdd65ee2ff7693e30ae9411eee28136196c8200ad7",
      ],
    },
  },
};
