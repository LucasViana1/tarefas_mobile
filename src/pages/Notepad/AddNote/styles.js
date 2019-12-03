import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  flex: 1;
  background-color: #ebf2ff;
  padding: 1px;
`;
export const Title = styled.Text`
  font-family: Roboto-Thin;
  color: red;
  font-size: 40px;
`;
export const Header = styled.View`
  background-color: #2868de;
  padding: 6px;
`;

export const TextArea = styled.TextInput`
  border-width: 1;
  font-size: 30px;
`;
export const Button = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  margin: 10px;
  background-color: #0ac200;
  width: 124px;
  height: 48px;
  border-radius: 10px;
`;
export const Body = styled.ScrollView`
  display: flex;
  flex: 1;
`;
export const Panel = styled.View`
  align-items: center;
`;
export const LabelButton = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 18;
`;
