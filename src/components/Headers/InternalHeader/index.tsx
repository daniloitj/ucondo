import { TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components';
import { Container, Title } from './styles';
import { ArrowLeft, Check } from 'phosphor-react-native';

interface HeaderProps {
  title: string;
  handleAction: () => void;
  handleSave: () => void;
}

export const InternalHeader: React.FC<HeaderProps> = ({title, handleAction, handleSave }) => {

  const insets = useSafeAreaInsets();

  const paddingTop = insets.top + 32;
  const { COLORS } = useTheme();

  return (
    <Container style={{ paddingTop }}>
      <TouchableOpacity activeOpacity={0.7} onPress={handleAction}>
        <ArrowLeft 
          size={22} 
          weight='bold' 
          color={COLORS.WHITE}
        />
      </TouchableOpacity>

      <Title>
        {title}
      </Title>

      <TouchableOpacity activeOpacity={0.7} onPress={handleSave}>
        <Check 
          size={22} 
          weight='bold' 
          color={COLORS.WHITE}
        />
       </TouchableOpacity>
    </Container>
  );
}
