import { Col, Row, Text } from '@nextui-org/react'

/**
 * Types
 */
interface IProps {
    deploy: any
}

/**
 * Component
 */
export default function RequestDeployCard({ deploy }: IProps) {
    return (
        <Row>
            <Col>
                <Text h5>Deploy</Text>
                <Text color="$gray400" data-testid="request-methods">{deploy.request.params.deploy.deploy.hash}</Text>
            </Col>
        </Row>
    )
}
