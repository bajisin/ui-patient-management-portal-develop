import React, { useContext } from "react";

import Highcharts from "highcharts";
import HighchartsData from "highcharts/modules/data";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsHeatmap from "highcharts/modules/heatmap";
import HighchartsReact from "highcharts-react-official";
import HighchartsTreeChart from "highcharts/modules/treemap";
import { LanguageContext } from "../../context/languageContext";
import MultiProgress from "react-multi-progress";
import { red } from "@mui/material/colors";
import { useSelector } from "react-redux";

// charts
HighchartsData(Highcharts);
HighchartsHeatmap(Highcharts);
HighchartsTreeChart(Highcharts);
HighchartsExporting(Highcharts);

// Order Status
export function OrderStatusChart() {
  const { orderStatus: data } = useSelector((state) => state.DASHBOARDSTATUS);
  return (
    <MultiProgress
      className="totalOrders-chart"
      width={"100%"}
      height={15}
      elements={[
        {
          value: data.completed,
          color: "#00ABA5"
        },
        {
          value: data.pending,
          color: "#FDA375"
        },
        {
          value: data.rejected,
          color: "#FD7787"
        }
      ]}
    />
  );
}

export function TenantSnapshotChart({ role }) {
  const { tenantSnapshot: data = [] } = useSelector((state) => state.TENANTSNAPSHOT);
  if (data && data.length > 0) {
    const mappedData = data?.map((item, key) => ({
      name: item.tenantName,
      value: 90,
      tenantName: item.clientName,
      facilities: item.facilities === null ? 0 : item.facilities,
      labs: item.labs === null ? 0 : item.labs,
      orders: item.orders === null ? 0 : item.orders,
      patients: item.patients === null ? 0 : item.patients,
      providers: item.providers === null ? 0 : item.providers,
      colorValue: key
    }));
    const options = {
      chart: {
        height: "30%"
      },
      colorAxis: {
        minColor: "#8AC7DB",
        maxColor: Highcharts.getOptions().colors[0]
      },
      tooltip: {
        formatter: function () {
          const name = role === 1 ? this.point.name : this.point.tenantName;
          return `<strong>Name:</strong> ${name}<br>
                  <strong>Patients:</strong> ${this.point.patients}<br>
                  <strong>Facilities:</strong> ${this.point.facilities}<br>
                  <strong>Labs:</strong> ${this.point.labs}<br>
                  <strong>Orders:</strong> ${this.point.orders}<br>
                  <strong>Providers:</strong> ${this.point.providers}`;
        }
      },

      series: [
        {
          type: "treemap",
          layoutAlgorithm: "squarified",
          clip: false,
          // data: [
          //   {
          //     name: "A",
          //     value: 6,
          //     colorValue: 1
          //   },
          //   {
          //     name: "B",
          //     value: 6,
          //     colorValue: 2
          //   },
          //   {
          //     name: "C",
          //     value: 4,
          //     colorValue: 3
          //   },
          //   {
          //     name: "D",
          //     value: 3,
          //     colorValue: 4
          //   },
          //   {
          //     name: "E",
          //     value: 2,
          //     colorValue: 5
          //   },
          //   {
          //     name: "F",
          //     value: 2,
          //     colorValue: 6
          //   },
          //   {
          //     name: "G",
          //     value: 1,
          //     colorValue: 7
          //   },
          //   {
          //     name: "K",
          //     value: 1,
          //     colorValue: 7
          //   }
          // ]
          data: mappedData
        }
      ],
      title: {
        text: ""
      }
    };
    return <HighchartsReact highcharts={Highcharts} options={options} />;
  } else {
    const options = {
      chart: {
        height: "30%"
      },
      colorAxis: {
        minColor: "#8AC7DB",
        maxColor: Highcharts.getOptions().colors[0]
      },

      series: [
        {
          type: "treemap",
          layoutAlgorithm: "squarified",
          clip: false,
          data: [
            {
              name: "No Data",
              value: 1,
              colorValue: 1
            }
          ]
        }
      ],
      title: {
        text: ""
      }
    };
    return <HighchartsReact highcharts={Highcharts} options={options} />;
  }
}

// Reports Overview
export function ReportOverviewChart() {
  const { reports } = useSelector((state) => state.Reports);
  const response = reports.data || [];
  function mapAbbreviatedToFullMonth(abbreviatedMonth) {
    const monthMap = {
      Jan: "January",
      Feb: "February",
      Mar: "March",
      Apr: "April",
      May: "May",
      Jun: "June",
      Jul: "July",
      Aug: "August",
      Sep: "September",
      Oct: "October",
      Nov: "November",
      Dec: "December"
    };

    return monthMap[abbreviatedMonth] || abbreviatedMonth;
  }
  const updatedResponseData = response.map((item) => ({
    ...item,
    month: mapAbbreviatedToFullMonth(item.month)
  }));

  const allMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const monthData = {};
  allMonths.forEach((month) => {
    monthData[month] = 0;
  });

  // Fill in the actual data based on the API response
  updatedResponseData.forEach((item) => {
    const { month, totalOrders } = item;
    monthData[month] = totalOrders;
  });

  // Extract the data values from the object
  const dataValues = Object.values(monthData);

  const options = {
    chart: {
      inverted: false,
      polar: false,
      height: "30%"
    },
    title: {
      text: null
    },
    legend: {
      reversed: false
    },
    xAxis: {
      categories: allMonths
    },
    colors: ["#9a28a3"],
    plotOptions: {
      series: {
        stacking: "normal",
        dataLabels: {
          enabled: true
        }
      }
    },
    series: [
      {
        type: "column",
        name: "Orders",
        borderRadius: 5,
        colorByPoint: true,
        data: dataValues, // Use the data values for each month
        showInLegend: false
      }
    ]
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export function OrderStatChart() {
  // const { reports } = useSelector((state) => state.DASHBOARD);
  const { stats } = useSelector((state) => state.Reports);
  const inProgressData = Array(12)
    .fill(null)
    .map(() => null);
  const completedData = Array(12)
    .fill(null)
    .map(() => null);
  const rejectedData = Array(12)
    .fill(null)
    .map(() => null);

  const monthMapping = {
    jan: 0,
    feb: 1,
    mar: 2,
    apr: 3,
    may: 4,
    jun: 5,
    jul: 6,
    aug: 7,
    sep: 8,
    oct: 9,
    nov: 10,
    dec: 11
  };
  const validStats = Array.isArray(stats?.data) ? stats?.data : [];
  validStats.forEach((stat) => {
    const monthIndex = monthMapping[stat.month.toLowerCase()]; // Assuming stat.month is the month index (1-based)
    if (stat.pending !== undefined) {
      inProgressData[monthIndex] = Number(stat.pending);
    }
    if (stat.completed !== undefined) {
      completedData[monthIndex] = Number(stat.completed);
    }
    if (stat.rejected !== undefined) {
      rejectedData[monthIndex] = Number(stat.rejected);
    }
  });

  const options = {
    chart: {
      type: "column"
    },
    title: {
      text: ""
    },
    subtitle: {
      text: ""
    },
    xAxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: ""
      }
    },
    legend: {
      align: "right",
      x: -30, // Adjust this value as needed to move the legend left or right
      verticalAlign: "top",
      y: 5, // Adjust this value as needed to move the legend up or down
      floating: true,
      backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || "white",
      borderColor: "#CCC",
      borderWidth: 1,
      shadow: false
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [
      {
        name: "In Progress",
        // data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
        data: inProgressData,
        color: "#fda375"
      },
      {
        name: "Completed",
        // data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
        data: completedData,
        color: "#00aba5"
      },
      {
        name: "Rejected",
        data: rejectedData,
        color: "#fd7787"
        // data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
      }
    ]
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}

export function ColumnBarChart() {
  const dataPrev = {
    2020: [
      ["kr", 9],
      ["jp", 12],
      ["au", 8],
      ["de", 17],
      ["ru", 19],
      ["cn", 26],
      ["gb", 27],
      ["us", 46]
    ],
    2016: [
      ["kr", 13],
      ["jp", 7],
      ["au", 8],
      ["de", 11],
      ["ru", 20],
      ["cn", 38],
      ["gb", 29],
      ["us", 47]
    ],
    2012: [
      ["kr", 13],
      ["jp", 9],
      ["au", 14],
      ["de", 16],
      ["ru", 24],
      ["cn", 48],
      ["gb", 19],
      ["us", 36]
    ],
    2008: [
      ["kr", 9],
      ["jp", 17],
      ["au", 18],
      ["de", 13],
      ["ru", 29],
      ["cn", 33],
      ["gb", 9],
      ["us", 37]
    ],
    2004: [
      ["kr", 8],
      ["jp", 5],
      ["au", 16],
      ["de", 13],
      ["ru", 32],
      ["cn", 28],
      ["gb", 11],
      ["us", 37]
    ],
    2000: [
      ["kr", 7],
      ["jp", 3],
      ["au", 9],
      ["de", 20],
      ["ru", 26],
      ["cn", 16],
      ["gb", 1],
      ["us", 44]
    ]
  };

  const data = {
    2020: [
      ["kr", 6],
      ["jp", 27],
      ["au", 17],
      ["de", 10],
      ["ru", 20],
      ["cn", 38],
      ["gb", 22],
      ["us", 39]
    ],
    2016: [
      ["kr", 9],
      ["jp", 12],
      ["au", 8],
      ["de", 17],
      ["ru", 19],
      ["cn", 26],
      ["gb", 27],
      ["us", 46]
    ],
    2012: [
      ["kr", 13],
      ["jp", 7],
      ["au", 8],
      ["de", 11],
      ["ru", 20],
      ["cn", 38],
      ["gb", 29],
      ["us", 47]
    ],
    2008: [
      ["kr", 13],
      ["jp", 9],
      ["au", 14],
      ["de", 16],
      ["ru", 24],
      ["cn", 48],
      ["gb", 19],
      ["us", 36]
    ],
    2004: [
      ["kr", 9],
      ["jp", 17],
      ["au", 18],
      ["de", 13],
      ["ru", 29],
      ["cn", 33],
      ["gb", 9],
      ["us", 37]
    ],
    2000: [
      ["kr", 8],
      ["jp", 5],
      ["au", 16],
      ["de", 13],
      ["ru", 32],
      ["cn", 28],
      ["gb", 11],
      ["us", 37]
    ]
  };

  const countries = {
    kr: {
      name: "South Korea",
      color: "rgb(201, 36, 39)"
    },
    jp: {
      name: "Japan",
      color: "rgb(201, 36, 39)"
    },
    au: {
      name: "Australia",
      color: "rgb(0, 82, 180)"
    },
    de: {
      flag: "de",
      color: "rgb(0, 0, 0)"
    },
    ru: {
      name: "Russia",
      color: "rgb(240, 240, 240)"
    },
    cn: {
      name: "China",
      color: "rgb(255, 217, 68)"
    },
    gb: {
      name: "Great Britain",
      color: "rgb(0, 82, 180)"
    },
    us: {
      name: "United States",
      color: "rgb(215, 0, 38)"
    }
  };
  const getData = (data) =>
    data.map((point) => ({
      name: point[0],
      y: point[1],
      color: countries[point[0]].color
    }));

  const options = {
    chart: {
      type: "column"
    },
    title: {
      text: "",
      align: "left"
    },
    subtitle: {
      text: "",
      align: "left"
    },
    plotOptions: {
      series: {
        grouping: false,
        borderWidth: 0
      }
    },
    legend: {
      enabled: false
    },
    tooltip: {
      shared: true,
      headerFormat:
        '<span style="font-size: 15px">' + "{series.chart.options.countries.(point.key).name}" + "</span><br/>",
      pointFormat: '<span style="color:{point.color}">\u25CF</span> ' + "{series.name}: <b>{point.y} medals</b><br/>"
    },
    xAxis: {
      type: "category",
      accessibility: {
        description: "Countries"
      },
      max: 4,
      labels: {
        useHTML: true,
        animate: true,
        format:
          "{chart.options.countries.(value).ucCode}<br>" +
          '<span class="f32">' +
          '<span style="display:inline-block;height:32px;vertical-align:text-top;" ' +
          'class="flag {value}"></span></span>',
        style: {
          textAlign: "center"
        }
      }
    },
    yAxis: [
      {
        title: {
          text: "Gold medals"
        },
        showFirstLabel: false
      }
    ],
    series: [
      {
        color: "rgba(158, 159, 163, 0.5)",
        pointPlacement: -0.2,
        linkedTo: "main",
        data: dataPrev[2020].slice(),
        name: "2016"
      },
      {
        name: "2020",
        id: "main",
        dataSorting: {
          enabled: true,
          matchByName: true
        },
        dataLabels: [
          {
            enabled: true,
            inside: true,
            style: {
              fontSize: "16px"
            }
          }
        ],
        data: getData(data[2020]).slice()
      }
    ],
    exporting: {
      allowHTML: true
    }
  };
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
// rendering charts
export const HighCharts = () => {
  const { translations } = useContext(LanguageContext);

  return (
    <div className="ls-dashboard">
      <div className="container-fluid ls-custom-container">
        <section className="ls-controller">
          <div className="row">
            <div className="col-lg-2">
              {/* <h3 className="ls-main-heading">{translations.dashboard}</h3> */}
              <h3 className="ls-main-heading">Dashboard</h3>
              <p></p>
            </div>
            <div>
              <OrderStatusChart></OrderStatusChart>
              <TenantSnapshotChart></TenantSnapshotChart>
              <ReportOverviewChart></ReportOverviewChart>
              <OrderStatChart></OrderStatChart>
              <ColumnBarChart></ColumnBarChart>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default HighCharts;
