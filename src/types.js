import PropTypes from 'prop-types';

const { number, string, bool } = PropTypes;
const serverType = {
  id: number,
  url: string,
  error: bool,
  name: string
};

export { serverType };

export default null;
