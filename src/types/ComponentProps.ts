export interface CommonInputProps {
    type?: string;
    placeholder: string;
    icon?: string;
    onInputChange?: (event: CustomEvent) => void;
}

export interface CommonButtonProps {
    label: string; // Button text
    onClick?: (event: React.MouseEvent<HTMLIonButtonElement>) => void; // Click event
    expand?: 'block' | 'full' | undefined; // Expansion style
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'light' | 'dark' | string; // Button color
    size?: 'small' | 'default' | 'large'; // Button size
    fill?: 'solid' | 'outline' | 'clear'; // Button fill style
    shape?: 'round' | 'square'; // Button shape
    icon?: React.ReactNode; // Optional icon
    disabled?: boolean; // Disable button
    rootClass?: string; // Additional custom CSS class
}