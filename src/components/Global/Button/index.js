import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

const style = {
    width: 100,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'aqua',
    fontSize: 16,
    fontWeight: 500,
};

function Button(props) {
    if (props.width) {
        style.width = props.width;
    }

    if (props.height) {
        style.height = props.height;
    }
    return (
        <button style={style} className={cx('btn')}>
            {props.children}
        </button>
    );
}

export default Button;
