import AccountCard from '@/components/AccountCard'
import AccountPicker from '@/components/AccountPicker'
import PageHeader from '@/components/PageHeader'
import SettingsStore from '@/store/SettingsStore'
import {Text} from '@nextui-org/react'
import {Fragment} from 'react'
import {useSnapshot} from 'valtio'
import {CASPER_MAINNET_CHAIN, CASPER_TEST_CHAIN} from '@/data/CASPERData'
import {createOrRestoreCasperWallet} from "@/utils/CasperWalletUtil";

export default function HomePage() {
    const {
        testNets,
        casperAddress
    } = useSnapshot(SettingsStore.state)

    const {casperAddresses} = createOrRestoreCasperWallet()

    return (
        <Fragment>
            <PageHeader title="Accounts">
            </PageHeader>
            {Object.entries(CASPER_MAINNET_CHAIN).map(([caip10, {name, logo, rgb}]) => (
                casperAddresses.map(address =>
                    <AccountCard
                        key={name}
                        name={name}
                        logo={logo}
                        rgb={rgb}
                        address={address}
                        chainId={caip10}
                        data-testid={'chain-card-' + caip10.toString()}
                    />
                )
            ))}
        </Fragment>
    )
}
