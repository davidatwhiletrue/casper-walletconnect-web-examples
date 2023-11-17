import PageHeader from '@/components/PageHeader'
import RelayRegionPicker from '@/components/RelayRegionPicker'
import SettingsStore from '@/store/SettingsStore'
import { eip155Wallets } from '@/utils/EIP155WalletUtil'
import { Card, Divider, Row, Switch, Text } from '@nextui-org/react'
import {Fragment, useState} from 'react'
import { useSnapshot } from 'valtio'
import packageJSON from '../../package.json'
import { casperWallets } from '@/utils/CasperWalletUtil'

export default function SetKeysPage() {
    const [casperKey1, setCasperKey1] = useState('');
    const [casperKey2, setCasperKey2] = useState('');

    const handleSetKeys = () => {
        localStorage.setItem('CASPER_PRIVATE_KEY_1', casperKey1)
        localStorage.setItem('CASPER_PRIVATE_KEY_2', casperKey2)
    }
    return (
        <Fragment>
            <PageHeader title="Set Keys" />

            <Text h4 css={{ marginBottom: '$5' }}>
                Init keys
            </Text>
            <Row justify="space-between" align="center">
                <input type='text' value={casperKey1} onChange={(event) => setCasperKey1(event.target.value)}></input>
            </Row>
            <Row justify="space-between" align="center">
                <input type='text' value={casperKey2} onChange={(event) => setCasperKey2(event.target.value)}></input>
            </Row>

            <Row justify="space-between" align="center">
                <button onClick={handleSetKeys}>Set keys</button>
            </Row>

        </Fragment>
    )
}
