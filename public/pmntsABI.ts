const pmntsABI = [
	{
		inputs: [],
		stateMutability: 'nonpayable',
		type: 'constructor',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'uint256',
				name: 'uuid',
				type: 'uint256',
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'linkedAddr',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'bool',
				name: 'status',
				type: 'bool',
			},
		],
		name: 'Linked',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'user',
				type: 'address',
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'newOwner',
				type: 'address',
			},
		],
		name: 'OwnershipTransferred',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'uint256',
				name: 'uuid',
				type: 'uint256',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'recipUuid',
				type: 'uint256',
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'recip',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'contract ERC20',
				name: 'token',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256',
			},
		],
		name: 'P2PTransfer',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'uint256',
				name: 'interactionId',
				type: 'uint256',
			},
			{
				indexed: false,
				internalType: 'bytes',
				name: 'data',
				type: 'bytes',
			},
		],
		name: 'RequestInteraction',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'uint256',
				name: 'uuid',
				type: 'uint256',
			},
			{
				indexed: false,
				internalType: 'contract ERC20',
				name: 'token',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256',
			},
		],
		name: 'Take',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'uint256',
				name: 'uuid',
				type: 'uint256',
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'newAddr',
				type: 'address',
			},
		],
		name: 'WithdrawUpdated',
		type: 'event',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_signer',
				type: 'address',
			},
		],
		name: 'create',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'uuid',
				type: 'uint256',
			},
			{
				internalType: 'contract ERC20',
				name: 'token',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256',
			},
		],
		name: 'deposit',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'uuid',
				type: 'uint256',
			},
		],
		name: 'fund',
		outputs: [],
		stateMutability: 'payable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'interactionCount',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'uuid',
				type: 'uint256',
			},
			{
				internalType: 'contract ERC20',
				name: 'tkn',
				type: 'address',
			},
		],
		name: 'internalBal',
		outputs: [
			{
				internalType: 'uint256',
				name: 'bal',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'uuid',
				type: 'uint256',
			},
			{
				internalType: 'bool',
				name: 'status',
				type: 'bool',
			},
		],
		name: 'link',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'uuid',
				type: 'uint256',
			},
			{
				internalType: 'address',
				name: 'account',
				type: 'address',
			},
		],
		name: 'linkedAddr',
		outputs: [
			{
				internalType: 'bool',
				name: 'linked',
				type: 'bool',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'owner',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'bytes',
				name: 'interaction',
				type: 'bytes',
			},
		],
		name: 'request',
		outputs: [
			{
				internalType: 'uint256',
				name: 'num',
				type: 'uint256',
			},
		],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'uuid',
				type: 'uint256',
			},
			{
				internalType: 'address',
				name: 'recip',
				type: 'address',
			},
			{
				internalType: 'contract ERC20',
				name: 'token',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256',
			},
			{
				internalType: 'address',
				name: 'src',
				type: 'address',
			},
		],
		name: 'send',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'uuid',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: 'recipUuid',
				type: 'uint256',
			},
			{
				internalType: 'contract ERC20',
				name: 'token',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256',
			},
			{
				internalType: 'address',
				name: 'src',
				type: 'address',
			},
		],
		name: 'send',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'uuid',
				type: 'uint256',
			},
			{
				internalType: 'contract ERC20',
				name: 'token',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256',
			},
			{
				internalType: 'address',
				name: 'src',
				type: 'address',
			},
		],
		name: 'take',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'newOwner',
				type: 'address',
			},
		],
		name: 'transferOwnership',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'uuid',
				type: 'uint256',
			},
			{
				internalType: 'address',
				name: 'newSigner',
				type: 'address',
			},
		],
		name: 'updateSigner',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'uuid',
				type: 'uint256',
			},
			{
				internalType: 'address',
				name: 'withdrawer',
				type: 'address',
			},
		],
		name: 'updateWithdraw',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'uuidCount',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'uuid',
				type: 'uint256',
			},
		],
		name: 'uuids',
		outputs: [
			{
				internalType: 'address',
				name: 'signer',
				type: 'address',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'uuid',
				type: 'uint256',
			},
		],
		name: 'withdrawAddr',
		outputs: [
			{
				internalType: 'address',
				name: 'withdrawAddr',
				type: 'address',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
] as const
export default pmntsABI
