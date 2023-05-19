import React from 'react';
import { Spin } from 'antd';
import numeral from 'numeral';
import { LoadingOutlined } from '@ant-design/icons';

import './styles.scss';

interface Props {
  label: string;
  id?: string;
  value?: any;
  datePicker?: boolean;
  select?: boolean;
  phone?: string;
  formatNumber?: boolean;
  onChange?: (value?: any, options?: any) => void;
  loading?: boolean;
  children: Element | any;
  charCount?: number | [number, number];
}

const StackedLabel: React.FC<Props> = ({
  label,
  id = 'StackedLabel',
  value = '',
  datePicker = false,
  phone = null,
  select = false,
  onChange = () => null,
  formatNumber = false,
  loading = false,
  charCount,
  children,
}) => {
  const [status, setStatus] = React.useState(
    [null, undefined, ''].includes(value) ? '' : '__stacked',
  );
  const [datePickerOpen, setDatePickerOpen] = React.useState(false);
  const [selectOpen, setSelectOpen] = React.useState(false);

  const onFocus = () => setStatus('__stacked');
  const onBlur = () => {
    setStatus([null, undefined, ''].includes(value) ? '' : '__stacked');
  };

  const ref = React.useRef({
    focus: (): any => null,
  });

  const datePickerProps = {
    open: datePickerOpen,
    onOpenChange: (o: boolean) => {
      setDatePickerOpen(o);
    },
  };

  const numberProps = {
    formatter: (value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    parser: (value: any) => value.replace(/\$\s?|(,*)/g, ''),
  };

  const selectProps = {
    open: selectOpen,
    onDropdownVisibleChange: (o: boolean) => {
      setSelectOpen(o);
    },
  };

  return (
    <div className={!phone ? 'input' : 'input__phone'}>
      {React.cloneElement(children, {
        ref,
        value,
        onChange,
        onFocus,
        onBlur,
        ...(datePicker ? datePickerProps : {}),
        ...(select ? selectProps : {}),
        ...(loading ? { disabled: true } : {}),
        ...(formatNumber ? numberProps : {}),
        placeholder: '',
        'data-char-count-input': charCount ? true : false,
      })}
      {phone && (
        <span className={`input__phone__code_prefix`}>{phone}</span>
      )}
      {loading && (
        <div className={`input__loading`}>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 14 }} spin />} />
        </div>
      )}

      {charCount && (
        <div
          className={`input__word_count`}
          data-over-limit={
            (typeof value === 'string' ? value.length : 0) <
              (typeof charCount !== 'number' ? charCount[0] : charCount) ||
            (typeof value === 'string' ? value.length : 0) >
              (typeof charCount === 'number' ? charCount : charCount[1])
          }
        >
          {`${
            typeof value === 'string' ? numeral(value.length).format() : 0
          }/${numeral(
            typeof charCount === 'number' ? charCount : charCount[1],
          ).format()}`}
        </div>
      )}

      <label
        key={`label-for-${id}`}
        htmlFor={id}
        className={`input__label${status}`}
        onClick={() => {
          ref.current.focus();
          if (datePicker) setDatePickerOpen(true);
          if (select) setSelectOpen(!selectOpen);
        }}
      >
        {label}
      </label>
    </div>
  );
};

export default StackedLabel;
