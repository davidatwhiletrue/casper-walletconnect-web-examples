import PageHeader from '@/components/PageHeader'
import RelayRegionPicker from '@/components/RelayRegionPicker'
import SettingsStore from '@/store/SettingsStore'
import { eip155Wallets } from '@/utils/EIP155WalletUtil'
import { Card, Divider, Row, Switch, Text } from '@nextui-org/react'
import { Fragment } from 'react'
import { useSnapshot } from 'valtio'
import packageJSON from '../../package.json'
import { casperWallets } from '@/utils/CasperWalletUtil'

export default function SettingsPage() {
  const {
    testNets,
    eip155Address,
    casperAddress
  } = useSnapshot(SettingsStore.state)

  return (
    <Fragment>
      <PageHeader title="Settings" />

      <Text h4 css={{ marginBottom: '$5' }}>
        Packages
      </Text>
      <Row justify="space-between" align="center">
        <Text color="$gray400">@walletconnect/sign-client</Text>
        <Text color="$gray400">{packageJSON.dependencies['@walletconnect/sign-client']}</Text>
      </Row>
      <Row justify="space-between" align="center">
        <Text color="$gray400">@walletconnect/utils</Text>
        <Text color="$gray400">{packageJSON.dependencies['@walletconnect/utils']}</Text>
      </Row>
      <Row justify="space-between" align="center">
        <Text color="$gray400">@walletconnect/types</Text>
        <Text color="$gray400">{packageJSON.devDependencies['@walletconnect/types']}</Text>
      </Row>

      <Divider y={2} />

      <Text h4 css={{ marginBottom: '$5' }}>
        Testnets
      </Text>
      <Row justify="space-between" align="center">
        <Switch
          checked={testNets}
          onChange={SettingsStore.toggleTestNets}
          data-testid="settings-toggle-testnets"
        />
        <Text>{testNets ? 'Enabled' : 'Disabled'}</Text>
      </Row>

      <Divider y={2} />

      <Row justify="space-between" align="center">
        <Text h4 css={{ marginBottom: '$5' }}>
          Relayer Region
        </Text>
        <RelayRegionPicker />
      </Row>

      <Divider y={2} />



    </Fragment>
  )
}
