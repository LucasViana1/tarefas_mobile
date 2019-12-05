import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  flex: 1;
  background-color: #ebf2ff;
`;

export const TextArea = styled.TextInput`
  flex: 1;
  border-width: 1;
  font-size: 30px;
  background-color: ${(props) => {
    let resp = '';
    if (props.valueSelect === 'Comum') {
      resp = '#c7ffd6';
    } else if (props.valueSelect === 'Atenção') {
      resp = '#feffc4';
    } else {
      resp = '#ffcbc7';
    }
    return resp;
  }};
  border-radius: 10px;
  border-color: #5c5c5c;
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
  margin-top: 10px;
  padding: 4px;
`;
export const PanelButton = styled.View`
  align-items: center;
`;
export const LabelButton = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 18;
`;

export const PanelSelect = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center
  margin: 16px 6px 16px 6px;
`;
export const Select = styled.Picker`
  flex: 1;
`;
export const LabelSelect = styled.Text`
  flex: 1;
  font-size: 16px;
`;
