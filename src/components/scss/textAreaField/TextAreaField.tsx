import PropTypes from 'prop-types';
import { Form, Input } from 'antd';
const { TextArea } = Input;

const TextAreaField = (props) => {
  const { rows, label, validatestatus, inline, help, name, onChange, ...rest } = props;
  return (
    <Form.Item validateStatus={validatestatus} help={help} label={label} colon={false}>
      <TextArea style={{ height: ' auto !important' }} rows={rows} name={name} onChange={onChange} {...rest} />
    </Form.Item>
  );
};

TextAreaField.defaultProps = {
  rows: 6,
};

TextAreaField.propTypes = {
  rows: PropTypes.number,
};

export default TextAreaField;
