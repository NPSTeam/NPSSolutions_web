import { forwardRef } from 'react';
import clsx from 'clsx';
import EmailInput from './EmailInput';

const ContactEmailSelector = forwardRef(({ value, onChange, className }, ref) => {
  return (
    <div className={clsx('w-full', className)} ref={ref}>
      {value.map((item, index) => (
        <EmailInput
          value={item}
          key={index}
          onChange={(val) => {
            onChange(value.map((_item, _index) => (index === _index ? val : _item)));
          }}
          onRemove={(val) => {
            onChange(value.filter((_item, _index) => index !== _index));
          }}
          hideRemove={value.length === 1}
        />
      ))}
      {/* <Button
        className="group inline-flex items-center mt-2 -ml-4 py-2 px-4 rounded cursor-pointer"
        onClick={() => onChange([...value, ContactModel().emails[0]])}
      >
        <FuseSvgIcon size={20}>heroicons-solid:plus-circle</FuseSvgIcon>

        <span className="ml-8 font-medium text-secondary group-hover:underline">
          Add an email address
        </span>
      </Button> */}
    </div>
  );
});

export default ContactEmailSelector;
