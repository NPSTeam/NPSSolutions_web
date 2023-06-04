import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useMediaQuery } from '@mui/material';
import ButtonIndustry from './component/ButtonIndustry';
import AgricultureIcon from './component/icon/AgricultureIcon';
import TelecommunicationIcon from './component/icon/TelecommunicationIcon';
import { setTargetIndustryCategory } from './store/homeSlice';
import DetailContentIndustry from './component/DetailContentIndustry';
import ConstructionIcon from './component/icon/ConstructionIcon';
import ForestryIcon from './component/icon/ForestryIcon';

const Feature = () => {
  const targetIndustryCategory = useSelector(
    (state) => state.homePageNew.home.targetIndustryCategory
  );

  const dataIndustry = [
    {
      icon: <AgricultureIcon isActive={targetIndustryCategory.category === 'AGRICULTURE'} />,
      category: 'AGRICULTURE',
      description: 'Optimize agriculture through efficient data analysis.',
      mainColor: '#0A4A03',
      background: 'bg-agriculture-content',
      imgBgColor: '#D3FCCF',
      content: {
        description:
          'Drones and AI revolutionize agriculture by optimizing crop yields and resource usage through efficient data collection and analysis.',
        listMenu: [
          {
            id: 1,
            title: 'Yield Mapping',
            description:
              'Skyeye can generate accurate yield maps of a farm, which can help farmers optimize harvest plans and identify areas that need attention.',
            image: 'YieldMapping',
          },
          {
            id: 2,
            title: 'Weed Detection',
            description:
              'The platform can detect and map weeds, making it easier for farmers to target them with herbicides and minimize the use of chemicals.',
            image: 'WeedDetection',
          },
          {
            id: 3,
            title: 'Soil Analysis',
            description:
              'Skyeye can provide detailed soil analysis, including information about nutrient levels, soil pH, and other factors that can impact crop growth.',
            image: 'SoilAnalysis',
          },
          {
            id: 4,
            title: 'Customized Reports',
            description:
              'Skyeye can generate customized reports that provide detailed insights into crop health, yield potential, and other factors that are relevant to a specific farm or crop type.',
            image: 'CustomizedReports',
          },
          {
            id: 5,
            title: 'Crop Health Monitoring',
            description:
              "Skyeye's software can detect early signs of disease, nutrient deficiencies, or other issues that can impact crop health and yield potential.",
            image: 'CropHealthMonitoring',
          },
          {
            id: 6,
            title: 'Plant Counting',
            description:
              'Skyeye can accurately count the number of plants in a field, which can help farmers estimate yields and plan harvests.',
            image: 'PlantCounting',
          },
        ],
      },
    },
    {
      icon: (
        <TelecommunicationIcon isActive={targetIndustryCategory.category === 'TELECOMMUNICATION'} />
      ),
      category: 'TELECOMMUNICATION',
      description: 'improved Telecom tower management.',
      mainColor: '#1D588B',
      background: 'bg-telecommunication-content',
      imgBgColor: '#CCE6FF',
      content: {
        description:
          'Drones and AI revolutionize agriculture by optimizing crop yields and resource usage through efficient data collection and analysis.',
        listMenu: [
          {
            id: 1,
            title: 'Automatic Processing',
            description: 'The algorithms automatically transform images into accurate 3D models.',
            image: 'AutomaticProcessing',
          },
          {
            id: 2,
            title: 'Inspection tool',
            description:
              'Auto detect abnormal on tower structure and posture (inclined, missing of joinning parts, corrosion, and generate warning/recommendation for repaire/maintenant decision with level of risk.',
            image: 'InspectionTool',
          },
          {
            id: 3,
            title: 'Advanced analysis',
            description:
              'Auto detect altitude, distance, dimension of equipment/object, exact position of equipment/object in 3D model, angle of equipment/object (Tilt, Azimuth, Plumb).',
            image: 'AdvancedAnalysis',
          },
          {
            id: 4,
            title: 'Automatic Reports',
            description:
              'Combine notes, measurements and positional information into professional PDF',
            image: 'AutomaticReports',
          },
        ],
      },
    },
    {
      icon: <ConstructionIcon isActive={targetIndustryCategory.category === 'CONSTRUCTION'} />,
      category: 'CONSTRUCTION',
      description: 'improved Telecom tower management.',
      mainColor: '#DCAC65',
      background: 'bg-construction-content',
      imgBgColor: '#FFF5CC',
      content: {
        description: '',
        listMenu: [
          {
            id: 1,
            title: 'Aerial Mapping',
            description:
              'create detailed 2D and 3D maps of construction sites, which can help contractors track progress, identify potential issues, and communicate with stakeholders.',
            image: 'AerialMapping',
          },
          {
            id: 2,
            title: 'Site Inspection',
            description:
              'The platform can provide high-resolution imagery and video of construction sites, which can help contractors identify potential safety hazards, monitor progress, and ensure compliance with regulations.',
            image: 'SiteInspection',
          },
          {
            id: 3,
            title: 'Thermal Imagery',
            description:
              'capture thermal imagery of construction sites, which can help identify issues with insulation, detect leaks, and monitor equipment performance.',
            image: 'ThermalImagery',
          },
          {
            id: 4,
            title: 'Stockpile Measurement',
            description:
              'The platform can accurately measure stockpiles of materials, such as sand and gravel, which can help contractors estimate costs and plan deliveries.',
            image: 'StockpileMeasurement',
          },
          {
            id: 5,
            title: 'Progress Tracking',
            description:
              'help contractors track progress over time by comparing aerial imagery of the construction site over different time periods.',
            image: 'ProgressTracking',
          },
        ],
      },
    },
    {
      icon: <ForestryIcon isActive={targetIndustryCategory.category === 'FORESTRY'} />,
      category: 'FORESTRY',
      description: 'improved Telecom tower management.',
      mainColor: '#0A4A03',
      background: 'bg-forestry-content',
      imgBgColor: '#D3FCCF',
      content: {
        description: '',
        listMenu: [
          {
            id: 1,
            title: 'Forest Mapping',
            description:
              'The platform can generate detailed maps of forested areas, providing insights into forest structure and composition that can inform management decisions.',
            image: 'ForestMapping',
          },
          {
            id: 2,
            title: 'Tree Counting',
            description:
              'uses high-resolution aerial imagery to count trees and estimate forest density, providing accurate data for forest management and planning.',
            image: 'TreeCounting',
          },
          {
            id: 3,
            title: 'Health Assessment',
            description:
              'The platform can detect and analyze tree health and vitality, identifying issues such as disease, pests, and stress that can impact forest growth and productivity.',
            image: 'HealthAssessment',
          },
          {
            id: 4,
            title: 'Volume Calculation',
            description:
              'Skyeye can calculate the volume of timber in a forest, providing valuable information for timber harvesting and management.',
            image: 'VolumeCalculation',
          },
          {
            id: 5,
            title: 'Customizable Outputs',
            description:
              'Auto generate customizable outputs such as georeferenced maps, volume estimates, and health assessments, allowing users to tailor the data to their specific needs',
            image: 'CustomizableOutputs',
          },
        ],
      },
    },
    // {
    //   icon: 'powerline',
    //   category: 'POWER LINE',
    //   description: 'improved Telecom tower management.',
    //   mainColor: '#FF8A00',
    // },
  ];

  useEffect(() => {
    dispatch(setTargetIndustryCategory(dataIndustry[0]));
  }, []);

  const dispatch = useDispatch();

  const handleClickItem = (item) => {
    if (item.category === targetIndustryCategory.category) return;
    dispatch(setTargetIndustryCategory(item));
  };

  const screenNonHd = useMediaQuery('(max-width:1366px)');
  return (
    <div
      style={{
        height: '100rem',
        width: '100%',
        paddingTop: '8rem',
        background:
          'linear-gradient(175.37deg, rgba(250, 255, 239, 0.06) 3.42%, rgba(250, 255, 239, 0.06) 3.43%, rgba(236, 254, 255, 0.06) 94.15%), #FBFDFF',
      }}
      id="industry"
    >
      <div
        style={{
          display: 'flex',
          position: 'relative',
          left: '15rem',
          width: 'fit-content',
        }}
      >
        <div
          style={{ backgroundColor: '#0D3659', margin: 'auto 0', width: '7.2rem' }}
          className="w-44 border-2 h-0"
        />

        <p
          style={{
            fontSize: '3.6rem',
            fontWeight: '700',
            color: '#0D3659',
            marginLeft: '1rem',
          }}
        >
          FEATURES
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          position: 'relative',
          left: '15rem',
          paddingTop: '1rem',
          width: 'fit-content',
        }}
      >
        <p
          style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#0D3659',
          }}
        >
          WHAT WE’VE MADE
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          padding: screenNonHd ? '5rem 5rem 5rem 23rem' : '5rem 23rem 5rem 23rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {dataIndustry.map((item, index) => (
            <ButtonIndustry
              key={index}
              icon={item.icon}
              category={item.category}
              description={item.description}
              mainColor={item.mainColor}
              isActive={targetIndustryCategory.category === item.category}
              handleClickItem={() => handleClickItem(item)}
            />
          ))}
        </div>

        <DetailContentIndustry />
      </div>
    </div>
  );
};

export default Feature;
