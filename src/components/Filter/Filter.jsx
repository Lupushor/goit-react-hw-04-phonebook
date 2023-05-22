import PropTypes from 'prop-types';
import { Form, Label } from 'components/Form/ContactForm.styled';
import { Input } from './Filter.styled';

export const Filter = ({ filter, onChange }) => {
  return (
    <Form>
      <Label>
        Find contacts by name
        <Input value={filter} type="text" name="name" onChange={onChange} />
      </Label>
    </Form>
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
