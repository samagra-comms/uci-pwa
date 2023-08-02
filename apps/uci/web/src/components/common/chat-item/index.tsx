import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Box, useBreakpointValue, useColorModeValue } from '@chakra-ui/react';
import styles from './index.module.css';
import { useRouter } from 'next/navigation';
import { profilePic, crossPic } from '@/assets';
import { User } from '@/types';
import { AppContext } from '@/context';
import moment from 'moment';

interface chatItemProps {
  active: boolean;
  name: string;
  phoneNumber: string | null;
  user?: User;
  isBlank?: boolean;
}

const ChatItem: React.FC<chatItemProps> = ({ active, name, phoneNumber, user, isBlank }) => {
  const history = useRouter();
  const context = useContext(AppContext);
  const [botIcon, setBotIcon] = useState(profilePic);

  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    if (user?.botImage) {
      fetch(user?.botImage)
        .then((res) => {
          if (res.status === 403) {
            setBotIcon(profilePic);
          } else {
            setBotIcon(user?.botImage);
          }
        })
        .catch((err) => {
          setBotIcon(profilePic);
        });
    } else {
      setBotIcon(profilePic);
    }
  }, [user?.botImage]);

  const expiredItem = useMemo(() => {
    return (user?.endDate !== undefined && user.endDate < moment().format()) || (user?.status !== 'ENABLED');
  }, [user]);

  const onChangeUser = useCallback(() => {
    localStorage.setItem('currentUser', JSON.stringify(user));
    context?.toChangeCurrentUser(user);
    if (isMobile) {
      history.push(`/chats/${user?.id}`);
    }
  }, [context, history, user, isMobile]);

  return (
    <React.Fragment>
      <button
        onClick={onChangeUser}
        disabled={isBlank}
        className={`${active ? styles.activeContainer : styles.container}`}
        >
        <div className={styles.avatar}>
          <img
            src={!isBlank ? botIcon : crossPic}
            height={'100%'}
            width={'100%'}
            alt="profile pic"
          />
        </div>
        <Box className={`${styles.chatItem_text}`}>
          <Box
            className={`${phoneNumber === null ? styles.chatItem_botName : styles.chatItem_userName
              } ${active ? styles.activeFont : ''}`}
          >
            <p className={`${styles.paragraphStyle} ${expiredItem ? styles.paragraphStyleExpired : styles.paragraphStyleActive}`}>
              {name}
            </p>
          </Box>
        </Box>
      </button>
    </React.Fragment>
  );
};

export default ChatItem;
