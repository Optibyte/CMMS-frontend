import React, { useState } from 'react';
import { IonSearchbar, IonRow, IonCol, IonIcon } from '@ionic/react';
import { qrCodeOutline } from 'ionicons/icons';
import './style.scss';

interface SearchBarProps {
    onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event: any) => {
        setSearchTerm(event.target.value);
        onSearch(event.target.value);
    };

    return (
        <IonRow>
            <IonCol size="10">
                <IonSearchbar
                    value={searchTerm}
                    className="jobs-search"
                    debounce={0}
                    onIonInput={handleSearch}
                    placeholder="Search by job title"
                    showClearButton="focus"
                />
            </IonCol>
            <IonCol className="home-qr-code" size="2">
                <IonIcon icon={qrCodeOutline} />
            </IonCol>
        </IonRow>
    );
};

export default SearchBar;
