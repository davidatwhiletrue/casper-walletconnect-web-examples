import ProjectInfoCard from '@/components/ProjectInfoCard'
import ProposalSelectSection from '@/components/ProposalSelectSection'
import RequestModalContainer from '@/components/RequestModalContainer'
import SessionProposalChainCard from '@/components/SessionProposalChainCard'
import ModalStore from '@/store/ModalStore'
import {
    styledToast,
    isCasperChain
} from '@/utils/HelperUtil'
import {signClient} from '@/utils/WalletConnectUtil'
import {Button, Divider, Modal, Text} from '@nextui-org/react'
import {SessionTypes} from '@walletconnect/types'
import {getSdkError, mergeArrays} from '@walletconnect/utils'
import {Fragment, useEffect, useState} from 'react'
import {casperAddresses} from '@/utils/CasperWalletUtil'

export default function SessionProposalModal() {
    const [selectedAccounts, setSelectedAccounts] = useState<Record<string, string[]>>({})
    const hasSelected = Object.keys(selectedAccounts).length

    // Get proposal data and wallet address from store
    const proposal = ModalStore.state.data?.proposal

    // Ensure proposal is defined
    if (!proposal) {
        return <Text>Missing proposal data</Text>
    }

    // Get required proposal data
    const {id, params} = proposal

    const {proposer, requiredNamespaces, optionalNamespaces, sessionProperties, relays} = params

    // Add / remove address from EIP155 selection
    function onSelectAccount(chain: string, account: string) {
        if (selectedAccounts[chain]?.includes(account)) {
            const newSelectedAccounts = selectedAccounts[chain]?.filter(a => a !== account)
            setSelectedAccounts(prev => ({
                ...prev,
                [chain]: newSelectedAccounts
            }))
        } else {
            const prevChainAddresses = selectedAccounts[chain] ?? []
            setSelectedAccounts(prev => ({
                ...prev,
                [chain]: [...prevChainAddresses, account]
            }))
        }
    }

    // Handle approve action, construct session namespace
    async function onApprove() {
        if (proposal) {
            let namespaces: SessionTypes.Namespaces = {}
            const selectedOptionalNamespaces = []
            for (const [chain, account] of Object.entries(selectedAccounts)) {
                if (chain.includes('optional')) {
                    selectedOptionalNamespaces.push(chain.split(':')[1])
                }
            }

            Object.keys(requiredNamespaces)
                .concat(selectedOptionalNamespaces)
                .forEach(key => {
                    const accounts: string[] = []
                    if (requiredNamespaces[key] && requiredNamespaces[key]?.chains) {
                        requiredNamespaces[key].chains?.map(chain => {
                            selectedAccounts[`required:${key}`].map(acc => accounts.push(`${chain}:${acc}`))
                        })
                        namespaces[key] = {
                            accounts,
                            methods: requiredNamespaces[key].methods,
                            events: requiredNamespaces[key].events,
                            chains: requiredNamespaces[key].chains
                        }
                    }
                    if (optionalNamespaces[key] && selectedAccounts[`optional:${key}`]) {
                        optionalNamespaces[key].chains?.map(chain => {
                            selectedAccounts[`optional:${key}`].forEach(acc => {
                                if (!accounts.includes(`${chain}:${acc}`)) {
                                    accounts.push(`${chain}:${acc}`)
                                }
                            })
                        })
                        namespaces[key] = {
                            ...namespaces[key],
                            accounts,
                            methods: mergeArrays(namespaces[key].methods, optionalNamespaces[key].methods),
                            events: mergeArrays(namespaces[key].events, optionalNamespaces[key].events),
                            chains: mergeArrays(namespaces[key].chains, optionalNamespaces[key].chains)
                        }
                    }
                })

            console.log('approving namespaces:', namespaces)

            try {
                await signClient.approve({
                    id,
                    relayProtocol: relays[0].protocol,
                    namespaces
                })
            } catch (e) {
                styledToast((e as Error).message, 'error')
                return
            }
        }
        ModalStore.close()
    }

    // Handle reject action
    async function onReject() {
        if (proposal) {
            try {
                await signClient.reject({
                    id,
                    reason: getSdkError('USER_REJECTED_METHODS')
                })
            } catch (e) {
                styledToast((e as Error).message, 'error')
                return
            }
        }
        ModalStore.close()
    }

    // Render account selection checkboxes based on chain
    function renderAccountSelection(chain: string, required: boolean) {
        if (isCasperChain(chain)) {
            return (
                <ProposalSelectSection
                    addresses={casperAddresses}
                    selectedAddresses={selectedAccounts[chain]}
                    onSelect={onSelectAccount}
                    chain={chain}
                    isRequired={required}
                />
            )
        }
    }

    return (
        <Fragment>
            <RequestModalContainer title="Session Proposal">
                <ProjectInfoCard metadata={proposer.metadata}/>

                <Divider y={2}/>
                {Object.keys(requiredNamespaces).length != 0 ? <Text h4 css={{marginBottom: '$5'}}>Required Permissions</Text> : null}
                {Object.keys(requiredNamespaces).map(chain => {
                    return (
                        <Fragment key={chain}>
                            <SessionProposalChainCard
                                requiredNamespace={requiredNamespaces[chain]}
                                data-testid={`session-proposal-card-req-${chain}`}
                            />
                            {renderAccountSelection(`required:${chain}`, true)}
                            <Divider y={2}/>
                        </Fragment>
                    )
                })}
            </RequestModalContainer>

            <Modal.Footer>
                <Button auto flat color="error" onPress={onReject} data-testid="session-reject-button">
                    Reject
                </Button>
                <Button auto flat color="success"
                        onPress={onApprove}
                        disabled={!hasSelected}
                        css={{opacity: hasSelected ? 1 : 0.4}}
                        data-testid="session-approve-button"
                > Approve </Button>
            </Modal.Footer>
        </Fragment>
    )
}
