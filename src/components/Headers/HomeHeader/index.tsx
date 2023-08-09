import { TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components';
import { Container, Title } from './styles';
import { Plus } from 'phosphor-react-native';

interface HeaderProps {
  title: string;
  handleAction: () => void;
}

export const HomeHeader: React.FC<HeaderProps> = ({title, handleAction }) => {

  const insets = useSafeAreaInsets();

  const paddingTop = insets.top + 32;
  const { COLORS } = useTheme();

  return (
    <Container style={{ paddingTop }}>
      <Title>
        {title}
      </Title>

      <TouchableOpacity activeOpacity={0.7} onPress={handleAction}>
        <Plus 
          size={22} 
          weight='bold' 
          color={COLORS.WHITE}
        />
      </TouchableOpacity>
    </Container>
  );
}
