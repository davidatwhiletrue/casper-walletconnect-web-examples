import * as React from "react";
import styled from "styled-components";
import { SessionTypes } from "@walletconnect/types";

import { fonts, responsive } from "../styles";
import Button from "./Button";
import Icon from "./Icon";
import Column from "./Column";

const SHeader = styled.div`
  margin-top: -1px;
  margin-bottom: 1px;
  width: 100%;
  height: 100px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 16px;
  @media screen and (${responsive.sm.max}) {
    font-size: ${fonts.size.small};
  }
`;

const SHeaderActions = styled.div`
  display: flex;
  & button {
    margin-left: 10px;
  }
`;

const SActiveAccount = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  font-weight: 500;
`;

const GithubLogoContainer = styled.div`
  padding-top: 8px;
`;

const SActiveSession = styled(SActiveAccount as any)`
  flex-direction: column;
  text-align: left;
  align-items: flex-start;
  & p {
    font-size: 0.8em;
    margin: 0;
    padding: 0;
  }
  & p:nth-child(n + 2) {
    font-weight: bold;
  }
`;

interface HeaderProps {
  ping: () => Promise<void>;
  emit: () => Promise<void>;
  disconnect: () => Promise<void>;
  session: SessionTypes.Struct | undefined;
}

const Header = (props: HeaderProps) => {
  const { ping, disconnect, session, emit } = props;
  return (
    <SHeader {...props}>
      {session ? (
        <Column>
          <SActiveSession>
            <p>{`Connected to`}</p>
            <p>{session.peer.metadata.name}</p>
          </SActiveSession>
          <SHeaderActions>
            <GithubLogoContainer>
              <a
                href={'https://cspr.click'}
                target="_blank"
                rel="noreferrer"
              >
                <Icon size={24} src={"https://cspr.click/wp-content/uploads/2023/06/favico.svg"} />
              </a>
            </GithubLogoContainer>
            <Button outline color="black" onClick={ping}>
              {"Ping"}
            </Button>
            <Button outline color="black" onClick={emit}>
              {"Emit"}
            </Button>
            <Button outline color="red" onClick={disconnect}>
              {"Disconnect"}
            </Button>
          </SHeaderActions>
        </Column>
      ) : null}
    </SHeader>
  );
};

export default Header;
