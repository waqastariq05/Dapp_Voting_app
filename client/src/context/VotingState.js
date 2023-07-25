import { useEffect, useState } from "react";
import VotingContext from "./VotingContext";
import VotingContract from "../contracts/Voting.json"
import { Web3 } from "web3";

const VotingState = (props) => {
    const [web3Api, setWeb3Api] = useState({
        web3: null,
        contract: null,
        address: null,
        provider: null
    });
    const [connected, setConnected] = useState(false);

    // Connect To Meta Mask
    const connectToMetaMask = async () => {
        try {
            const web3 = new Web3(window.ethereum);
            await window.ethereum.request({ method: 'eth_requestAccounts' });

            const netId = await web3.eth.net.getId();
            const deployedNet = VotingContract.networks[netId];
            const instance = new web3.eth.Contract(VotingContract.abi, deployedNet && deployedNet.address);
            setConnected(true);
            setWeb3Api({
                web3: web3,
                contract: instance,
                address: deployedNet.address,
                provider: web3.provider
            });
        } catch (error) {
            alert("Please Install Metamask");
        };
    }

    const [account, setAccount] = useState("No account Connected");
    // Get Connected Account
    useEffect(() => {
        const getAccount = async () => {
            const { web3 } = web3Api;
            const acc = await web3.eth.getAccounts();
            setAccount(acc[0])
        }
        web3Api.web3 && getAccount();
    }, [web3Api, web3Api.web3])


    const [ownerAcc, setOwnerAcc] = useState("")
    useEffect(() => {
        const getOwnerAcc = async () => {
            const { contract } = web3Api;
            const owner = await contract.methods.electionChief().call()
            setOwnerAcc(owner)
        }
        web3Api.contract && getOwnerAcc()
    }, [web3Api, web3Api.contract])

    // // Reload User List 
    const [reload, setReload] = useState(false)

    const reloadEffect = () => {
        setReload(!reload);
    }

    // Get users list
    const [regCandidate, setRegCandidate] = useState([])
    const getCandidates = async () => {
        const { contract } = web3Api;
        const candidates = await contract.methods.getCandidate().call()
        const registeredCandidates = await Promise.all(
            candidates.map((candidate) => {
                return candidate;
            })
        )
        setRegCandidate(registeredCandidates)
        reloadEffect();
    }

    // Get End Time
    const [endTime, setEndTime] = useState("")
    const getEndTime = async () => {
        const { contract } = web3Api;
        const time = await contract.methods.getVotingEndTime().call()
        setEndTime(time)
        reloadEffect();
    }

    // Find user is voted or not
    const [vote, setVote] = useState({});
    const getUserIsVoted = async () => {
        const { contract } = web3Api;
        const voterVoted = await contract.methods.didCurrentVoterVoted().call({ from: account })
        setVote(voterVoted)
        reloadEffect();
    }

    // Find user is register or not
    const [isReg, setIsReg] = useState({});
    const getUserIsReg = async () => {
        const { contract } = web3Api;
        const voterReg = await contract.methods.didVoterReg().call({ from: account })
        setIsReg(voterReg)
        reloadEffect();
    }

    // get voting result
    const [result, setResult] = useState([]);
    const getResult = async () => {
        const { contract } = web3Api;
        const res = await contract.methods.getResults(Math.floor(Date.now() / 1000)).call({ from: account })
        setResult(res)
        reloadEffect();
    }

    return (
        <VotingContext.Provider
            value={{
                web3Api,
                connected,
                connectToMetaMask,
                account,
                regCandidate,
                getCandidates,
                ownerAcc,
                endTime,
                getEndTime,
                vote,
                getUserIsVoted,
                isReg,
                getUserIsReg,
                result,
                getResult,
            }}
        >
            {props.children}
        </VotingContext.Provider>
    );
};
export default VotingState;
