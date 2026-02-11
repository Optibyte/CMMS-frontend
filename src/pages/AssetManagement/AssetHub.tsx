import React from 'react';
import {
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonMenuButton,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonIcon,
    IonText
} from '@ionic/react';
import {
    waterOutline,
    constructOutline,
    settingsOutline,
    flashOutline,
    funnelOutline,
    cubeOutline,
    layersOutline,
    infiniteOutline,
    cogOutline
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import './AssetHub.scss';

const AssetHub: React.FC = () => {
    const history = useHistory();

    const categories = [
        {
            title: 'Oil & Fluids',
            icon: waterOutline,
            path: '/asset-management/oil-fluids',
            description: 'Lubrication, coolant levels, and fluid analysis.',
            color: '#3880ff'
        },
        {
            title: 'Tools & Equipment',
            icon: constructOutline,
            path: '/asset-management/tools',
            description: 'Inventory, calibration, and tool checkouts.',
            color: '#3dc2ff'
        },
        {
            title: 'Mechanical Components',
            icon: settingsOutline,
            path: '/asset-management/mechanical',
            description: 'Belts, chains, and bearing management.',
            color: '#5260ff'
        },
        {
            title: 'Electrical Components',
            icon: flashOutline,
            path: '/asset-management/electrical',
            description: 'Motors, sensors, and control systems.',
            color: '#ffc409'
        },
        {
            title: 'Filters & Consumables',
            icon: funnelOutline,
            path: '/asset-management/filters',
            description: 'Filter replacements and consumable tracking.',
            color: '#2dd36f'
        },
        {
            title: 'Custom Equipment',
            icon: infiniteOutline,
            path: '/asset-management/custom',
            description: 'Specialized machinery and unique assets.',
            color: '#eb445a'
        },
        {
            title: 'Unified Master Dashboard',
            icon: layersOutline,
            path: '/asset-management/master',
            description: 'Cross-category analysis and engineering views.',
            color: '#7044ff'
        }
    ];

    return (
        <IonPage id="asset-hub-page">
            <IonHeader className="no-shadow">
                <IonToolbar className="hub-toolbar">
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Asset Management Hub</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen className="hub-content">
                <div className="hub-container">
                    <div className="hub-header">
                        <h1>Operations Center</h1>
                        <p>Select a category to manage specialized assets and equipment.</p>
                    </div>

                    <IonGrid>
                        <IonRow>
                            {categories.map((cat, idx) => (
                                <IonCol size="12" sizeSm="6" sizeLg="4" key={idx}>
                                    <IonCard className="category-card" onClick={() => history.push(cat.path)}>
                                        <div className="card-bg-icon">
                                            <IonIcon icon={cat.icon} />
                                        </div>
                                        <IonCardHeader>
                                            <div className="icon-wrapper" style={{ background: cat.color }}>
                                                <IonIcon icon={cat.icon} />
                                            </div>
                                            <IonCardTitle>{cat.title}</IonCardTitle>
                                            <IonText color="medium">
                                                <p>{cat.description}</p>
                                            </IonText>
                                        </IonCardHeader>
                                    </IonCard>
                                </IonCol>
                            ))}
                        </IonRow>
                    </IonGrid>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default AssetHub;
