pragma solidity >=0.4.21 <0.6.0;

contract MailApplication {

    struct Mail {
        string message;
        address sender;
    }

    Mail[] private allMail;

    // Maps an address to an array of indices, where each index corresponds with
    // a position in the allMail array contained by the inbox of the address.
    mapping(address => uint256[]) addressToIndices;

    mapping(string => address) usernameToAddress;

    function sendMail(string memory receiver, string memory message , address sender) public {
        Mail memory mail = Mail({message: message, sender: sender});

        addressToIndices[usernameToAddress[receiver]].push(allMail.length);
        allMail.push(mail);
    }

    // We can't return an array of Mail (which would be perfect to represent an inbox,)
    // because it is still an "experimental type." This means that the client will have
    // to call getMailAt for each element in the returned array.
    function getIndices(address sender) external view returns (uint256[] memory) {
        return addressToIndices[sender];
    }

    function getMailAt(uint256 index , address acount) external view returns (string memory message, address sender) {
        bool isInInbox = false;
        uint256[] storage indices = addressToIndices[acount];

        // Linear search O(n) to check if operation is valid. Can do binary search
        // O(log n) because we know that the array is sorted during insertion. We
        // could even change how we store the indices per user to a bitset, and get
        // O(1) checking.
        for (uint256 i = 0; i < indices.length && !isInInbox; i++) {
            if (indices[i] == index) {
                isInInbox = true;
            }
        }

        // If the requested mail was not sent to the person requesting the mail,
        // this assertion will fail.
        assert(isInInbox);

        // We cannot return structs, but we can return
        return (allMail[index].message, allMail[index].sender);
    }

}
