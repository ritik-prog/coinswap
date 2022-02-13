"use strict";
exports.id = 492;
exports.ids = [492];
exports.modules = {

/***/ 492:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "K": () => (/* binding */ TransactionContext),
  "k": () => (/* binding */ TransactionProvider)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(689);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);
;// CONCATENATED MODULE: ./lib/Transactions.json
const Transactions_namespaceObject = JSON.parse('{"Mt":[{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"address","name":"receiver","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"string","name":"message","type":"string"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"},{"indexed":false,"internalType":"string","name":"keyword","type":"string"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address payable","name":"receiver","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"string","name":"message","type":"string"},{"internalType":"string","name":"keyword","type":"string"}],"name":"publishTransaction","outputs":[],"stateMutability":"nonpayable","type":"function"}]}');
;// CONCATENATED MODULE: ./lib/constants.js

const contractAbi = Transactions_namespaceObject.Mt;
const contractAddress = '0x9C11875C8076B56d6Ba7437efc0430A944FfbA0F';

// EXTERNAL MODULE: external "ethers"
var external_ethers_ = __webpack_require__(982);
// EXTERNAL MODULE: ./lib/sanityClient.js
var sanityClient = __webpack_require__(190);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(853);
;// CONCATENATED MODULE: ./context/TransactionContext.js






const TransactionContext = /*#__PURE__*/ external_react_default().createContext();
let eth;
if (false) {}
const getEthereumContract = ()=>{
    const provider = new external_ethers_.ethers.providers.Web3Provider(eth);
    const signer = provider.getSigner();
    const transactionContract = new external_ethers_.ethers.Contract(contractAddress, contractAbi, signer);
    return transactionContract;
};
const TransactionProvider = ({ children  })=>{
    const { 0: currentAccount , 1: setCurrentAccount  } = (0,external_react_.useState)();
    const { 0: isLoading , 1: setIsLoading  } = (0,external_react_.useState)(false);
    const { 0: formData , 1: setFormData  } = (0,external_react_.useState)({
        addressTo: '',
        amount: ''
    });
    const router = (0,router_.useRouter)();
    const connectWallet = async (metamask = eth)=>{
        try {
            if (!metamask) return alert('please install metamask');
            const accounts = await metamask.request({
                method: 'eth_requestAccounts'
            });
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.error(error);
            throw new Error('No ethereum object');
        }
    };
    const checkIfWalletIsConnected = async (metamask = eth)=>{
        try {
            if (!metamask) return alert('please install metamask');
            const accounts = await metamask.request({
                method: 'eth_accounts'
            });
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
            }
        } catch (error) {
            console.log(error);
        }
    };
    (0,external_react_.useEffect)(()=>{
        checkIfWalletIsConnected();
    }, []);
    // ethereum.on('accountsChanged', function (accounts) {
    //   checkIfWalletIsConnected()
    // })
    const sendTransaction = async (metamask = eth, connectedAccount = currentAccount)=>{
        try {
            if (!metamask) return alert('Please intall metamask');
            const { addressTo , amount  } = formData;
            console.log(amount);
            const transactionContract = getEthereumContract();
            const parsedAmount = external_ethers_.ethers.utils.parseEther(amount);
            await metamask.request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from: connectedAccount,
                        to: addressTo,
                        gas: '0x7EF40',
                        value: parsedAmount._hex
                    }, 
                ]
            });
            const transactionHash = await transactionContract.publishTransaction(addressTo, parsedAmount, `Transferring ETH ${parsedAmount} to ${addressTo}`, '  TRANSFER');
            setIsLoading(true);
            await transactionHash.wait();
            //db
            await saveTransaction(transactionHash.hash, amount, currentAccount, addressTo);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    (0,external_react_.useEffect)(()=>{
        if (!currentAccount) return;
        (async ()=>{
            const userDoc = {
                _type: 'users',
                _id: currentAccount,
                userName: 'Unnamed',
                address: currentAccount
            };
            await sanityClient/* client.createIfNotExists */.L.createIfNotExists(userDoc);
        })();
    }, [
        currentAccount
    ]);
    const handleChange = (e, name)=>{
        console.log(name, ':', e.target.value);
        setFormData((prevState)=>({
                ...prevState,
                [name]: e.target.value
            })
        );
        console.log(formData);
    };
    const saveTransaction = async (txHash, amount, fromAddress = currentAccount, toAddress)=>{
        setIsLoading(true);
        const txDoc = {
            _type: 'transactions',
            _id: txHash,
            fromAddress: fromAddress,
            toAddress: toAddress,
            timestamp: new Date(Date.now()).toISOString(),
            txHash: txHash,
            amount: parseFloat(amount)
        };
        await sanityClient/* client.createIfNotExists */.L.createIfNotExists(txDoc);
        await sanityClient/* client.patch */.L.patch(currentAccount).setIfMissing({
            transactions: []
        }).insert('after', 'transactions[-1]', [
            {
                _key: txHash,
                _ref: txHash,
                _type: 'reference'
            }, 
        ]).commit();
        setIsLoading(false);
        return;
    };
    (0,external_react_.useEffect)(()=>{
        if (isLoading) {
            router.push(`/?loading=${currentAccount}`);
        } else {
            router.push(`/`);
        }
    }, [
        isLoading
    ]);
    return(/*#__PURE__*/ jsx_runtime_.jsx(TransactionContext.Provider, {
        value: {
            currentAccount,
            connectWallet,
            sendTransaction,
            handleChange,
            formData,
            checkIfWalletIsConnected
        },
        children: children
    }));
};


/***/ }),

/***/ 190:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "L": () => (/* binding */ client)
/* harmony export */ });
/* harmony import */ var _sanity_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(97);
/* harmony import */ var _sanity_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sanity_client__WEBPACK_IMPORTED_MODULE_0__);

const client = _sanity_client__WEBPACK_IMPORTED_MODULE_0___default()({
    projectId: 'zger3nsl',
    dataset: 'production',
    apiVersion: 'v1',
    token: 'skLZOsUMp4o1nsx93UGt46JNyKMbX3g2dGyL2WvnYWIW80ubkzSVWl8YoVar4pvPDlvw8FfiIZrKJJKKSYY4s8ZPzwZdD6R2LRkDOdxeJ6iHkGSySLKw96v1ff5B0JRaENGBJxE4deZ1HpJiYfD2ZnJCd1jpyzLUIyZbSQhjPhQAQdhXRcN7',
    useCdn: false
});


/***/ })

};
;