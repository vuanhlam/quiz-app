import clsx from 'clsx';
import styles from './Button.module.scss';


function Button(props) {

    const classes = clsx(styles.btn, {
        [styles.primary]: props.primary,
        [styles.secondery]: props.secondery,
        [styles.success]: props.success,
        [styles.warning]: props.warning
    })

    return <button className={classes}>Click me</button>;
}

export default Button;
