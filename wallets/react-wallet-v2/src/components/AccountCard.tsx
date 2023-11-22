import ChainCard from '@/components/ChainCard'
import SettingsStore from '@/store/SettingsStore'
import {eip155Addresses} from '@/utils/EIP155WalletUtil'
import {truncate} from '@/utils/HelperUtil'
import {updateSignClientChainId} from '@/utils/WalletConnectUtil'
import {Avatar, Button, Row, Text, Tooltip} from '@nextui-org/react'
import Image from 'next/image'
import {useState} from 'react'
import {useSnapshot} from 'valtio'
// @ts-ignore
import Identicon from 'react-identicons';

interface Props {
    name: string
    logo: string
    rgb: string
    address: string
    chainId: string
}

export default function AccountCard({name, logo, rgb, address = '', chainId}: Props) {
    const [copied, setCopied] = useState(false)
    const {activeChainId, account} = useSnapshot(SettingsStore.state)

    function onCopy() {
        navigator?.clipboard?.writeText(address)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
    }

    async function onChainChanged(chainId: string, address: string) {
        SettingsStore.setActiveChainId(chainId)
        await updateSignClientChainId(chainId.toString(), address)
    }

    return (
        <ChainCard rgb={rgb} flexDirection="row" alignItems="center">
            <Row css={{backgroundColor: 'white', height: '32px', width: '32px'}}>
                <Identicon string={address.toLowerCase()} size={32}/>
            </Row>
            <div style={{flex: 1}}>
                <Text h5 css={{marginLeft: '$9'}}>
                    {name}
                </Text>
                <Text weight="light" size={13} css={{marginLeft: '$9'}}>
                    {address ? truncate(address, 19).toLowerCase() : '<no address available>'}
                </Text>
            </div>

            <Tooltip content={copied ? 'Copied!' : 'Copy'} placement="left">
                <Button
                    size="sm"
                    css={{minWidth: 'auto', backgroundColor: 'rgba(132, 133, 140, 0.5)'}}
                    data-testid={'chain-copy-button' + chainId}
                    onClick={onCopy}
                >
                    <Image
                        src={copied ? '/icons/checkmark-icon.svg' : '/icons/copy-icon.svg'}
                        width={15}
                        height={15}
                        alt="copy icon"
                    />
                </Button>
            </Tooltip>

        </ChainCard>
    )
}
