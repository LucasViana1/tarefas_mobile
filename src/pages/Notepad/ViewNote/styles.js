import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: white;
  flex: 1;
`;
export const Card = styled.View`
  background-color: white;
  margin: 8px;
  padding: 8px;
  border-radius: 6px;
  border-top-width: 12px;
  ${(props) => {
    const colors = { borderTopColor: '', borderColor: '', backgroundColor: '' };
    if (props.type === 'Comum') {
      colors.borderTopColor = '#00d90d';
      colors.borderColor = '#007307';
      colors.backgroundColor = '#c7ffd6';
    } else if (props.type === 'Atenção') {
      colors.borderTopColor = '#ccd400';
      colors.borderColor = '#6c7000';
      colors.backgroundColor = '#feffc4';
    } else {
      colors.borderTopColor = '#db0e00';
      colors.borderColor = '#700700';
      colors.backgroundColor = '#ffcbc7';
    }
    return `
      border-top-color: ${colors.borderTopColor}; 
      border: 2px solid ${colors.borderColor}; 
      background-color: ${colors.backgroundColor};
    `;
  }}
`;

export const PanelTime = styled.View`
  padding: 3px;
  flex-direction: row;
  align-items: center;
`;
export const Time = styled.Text`
  margin-left: 3px;
  font-size: 18px;
  color: #525252;
`;
export const PanelDescription = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 8px;
  padding-horizontal: 16px;
  padding-bottom: 8px;
  border-bottom-width: 1px;
  border-bottom-color: gray;
  border-top-width: 1px;
  border-top-color: gray;
`;
export const Description = styled.Text.attrs((props) => ({
  numberOfLines: props.viewAll,
}))`
  font-size: 20px;
  margin-vertical: 24px;
`;
export const PanelButtonType = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const Button = styled.TouchableOpacity`
  flex: 1;
  margin-left: 4px;
  padding: 9px;
  border-radius: 40px;
  background-color: ${(props) => props.color};
`;
export const ButtonIcon = styled.TouchableOpacity`
  margin-left: 18px;
`;
export const TitleButtonType = styled.Text`
  flex: 4;
  color: #454545
`;
export const LabelButton = styled.Text`
  
`;
