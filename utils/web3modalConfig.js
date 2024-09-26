
import { createWeb3Modal, defaultSolanaConfig } from '@web3modal/solana'
import { solana, solanaTestnet, solanaDevnet } from '@web3modal/solana/chains'

// Setup chains
const chains = [solana, solanaTestnet, solanaDevnet]

// Your Reown Cloud project ID
export const projectId = 'b8151a845bbf6b23e85e7c9deedab0f5'

// Create a metadata object
const metadata = {
  name: 'Portfolio',
  description: 'AppKit Example',
  url: 'https://reown.com/appkit', // origin must match your domain & subdomain
  icons: ['https://assets.reown.com/reown-profile-pic.png']
}

// Create solanaConfig
const solanaConfig = defaultSolanaConfig({
  metadata,
  chains,
  projectId
})

// Create modal
const modal = createWeb3Modal({
  solanaConfig,
  chains,
  projectId
})