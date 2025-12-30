export default function AppLogoIcon({ className = '', ...props }) {
    return (
        <img
            src="/cselogo-removebg.png"
            alt="CSE Department Logo"
            className={`h-10 w-auto ${className}`}
            {...props}
        />
    );
}
