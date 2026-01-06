import { Component, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgApexchartsModule, ChartComponent, ApexAxisChartSeries, ApexChart, ApexXAxis, ApexDataLabels, ApexTitleSubtitle, ApexStroke, ApexGrid, ApexFill, ApexPlotOptions, ApexYAxis } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  fill: ApexFill;
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: 'app-s3-dashboard',
  standalone: true,
  imports: [NgApexchartsModule, RouterLink],
  template: `
    <div class="s3-dashboard-container">
      <header class="dashboard-header">
        <div class="header-main">
          <h2>S3 storage Dashboard</h2>
          <p class="subtitle">Global storage distribution and bucket analytics</p>
        </div>
        <div class="header-actions">
          <button routerLink="policies" class="secondary-btn">Lifecycle Policies</button>
          <button class="primary-btn">+ Create Bucket</button>
        </div>
      </header>

      <section class="metrics-row">
        <div class="metric-card">
          <span class="label">Total Storage</span>
          <span class="value">4.2 TB</span>
          <span class="trend positive">↑ 12% vs last month</span>
        </div>
        <div class="metric-card">
          <span class="label">Total Objects</span>
          <span class="value">12.5M</span>
          <span class="trend">Steady</span>
        </div>
        <div class="metric-card">
          <span class="label">Active Requests</span>
          <span class="value">2.4k/s</span>
          <span class="trend positive">↑ 5%</span>
        </div>
        <div class="metric-card">
          <span class="label">Cross-Region Traffic</span>
          <span class="value">150 GB</span>
          <span class="trend negative">↓ 2%</span>
        </div>
      </section>

      <div class="chart-grid">
        <div class="chart-container">
          <apx-chart
            [series]="regionChart.series!"
            [chart]="regionChart.chart!"
            [xaxis]="regionChart.xaxis!"
            [plotOptions]="regionChart.plotOptions!"
            [dataLabels]="regionChart.dataLabels!"
            [grid]="regionChart.grid!"
            [title]="regionChart.title!"
            [fill]="regionChart.fill!"
          ></apx-chart>
        </div>
        
        <div class="chart-container">
          <apx-chart
            [series]="bucketChart.series!"
            [chart]="bucketChart.chart!"
            [xaxis]="bucketChart.xaxis!"
            [plotOptions]="bucketChart.plotOptions!"
            [dataLabels]="bucketChart.dataLabels!"
            [grid]="bucketChart.grid!"
            [title]="bucketChart.title!"
            [fill]="bucketChart.fill!"
          ></apx-chart>
        </div>
      </div>

      <section class="bucket-list-section">
        <h3>Top Storage Buckets</h3>
        <div class="bucket-table-wrapper">
          <table class="bucket-table">
            <thead>
              <tr>
                <th>Bucket Name</th>
                <th>Region</th>
                <th>Storage Class</th>
                <th>Usage</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              @for (bucket of buckets; track bucket.name) {
                <tr>
                  <td>
                    <div class="bucket-cell">
                      <span class="icon">🪣</span>
                      {{ bucket.name }}
                    </div>
                  </td>
                  <td>{{ bucket.region }}</td>
                  <td><span class="class-badge">{{ bucket.class }}</span></td>
                  <td>
                    <div class="usage-bar-wrapper">
                       <div class="usage-bar" [style.width]="bucket.usage + '%'"></div>
                       <span class="usage-text">{{ bucket.size }}</span>
                    </div>
                  </td>
                  <td><span class="status-pill active">Health: Good</span></td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .s3-dashboard-container { padding: 32px; font-family: 'Inter', sans-serif; background: #fdfdfd; min-height: 100vh; }
    .dashboard-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
    .header-main h2 { margin: 0; font-size: 2rem; color: #0f172a; font-weight: 800; letter-spacing: -0.025em; }
    .subtitle { color: #64748b; margin-top: 4px; font-size: 1rem; }
    .primary-btn { background: #2563eb; color: white; border: none; padding: 12px 24px; border-radius: 12px; font-weight: 700; cursor: pointer; transition: 0.2s; }
    .primary-btn:hover { background: #1d4ed8; transform: translateY(-2px); }
    .secondary-btn { background: white; color: #64748b; border: 1px solid #e2e8f0; padding: 12px 24px; border-radius: 12px; font-weight: 700; cursor: pointer; transition: 0.2s; margin-right: 12px; }
    .secondary-btn:hover { background: #f8fafc; border-color: #cbd5e1; color: #0f172a; }

    .metrics-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; margin-bottom: 32px; }
    .metric-card { background: white; padding: 24px; border-radius: 20px; border: 1px solid #e2e8f0; display: flex; flex-direction: column; }
    .metric-card .label { font-size: 0.75rem; color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
    .metric-card .value { font-size: 1.75rem; font-weight: 800; color: #0f172a; margin: 12px 0 8px 0; }
    .trend { font-size: 0.8rem; font-weight: 600; color: #94a3b8; }
    .trend.positive { color: #10b981; }
    .trend.negative { color: #ef4444; }

    .chart-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-bottom: 40px; }
    .chart-container { background: white; border: 1px solid #e2e8f0; padding: 20px; border-radius: 20px; box-shadow: 0 1px 2px rgba(0,0,0,0.05); }

    .bucket-list-section h3 { margin-bottom: 24px; font-size: 1.25rem; color: #0f172a; font-weight: 800; }
    .bucket-table-wrapper { background: white; border: 1px solid #e2e8f0; border-radius: 20px; overflow: hidden; }
    .bucket-table { width: 100%; border-collapse: collapse; }
    .bucket-table th { text-align: left; padding: 16px 24px; background: #f8fafc; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 0.75rem; text-transform: uppercase; font-weight: 700; }
    .bucket-table td { padding: 16px 24px; border-bottom: 1px solid #f1f5f9; color: #334155; font-size: 0.95rem; }
    
    .bucket-cell { display: flex; align-items: center; gap: 12px; font-weight: 600; }
    .class-badge { background: #f1f5f9; padding: 4px 8px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; color: #475569; }
    
    .usage-bar-wrapper { width: 100%; display: flex; align-items: center; gap: 10px; }
    .usage-bar { height: 6px; background: #2563eb; border-radius: 3px; }
    .usage-text { font-size: 0.8rem; color: #64748b; font-weight: 600; min-width: 60px; }
    
    .status-pill { font-size: 0.75rem; font-weight: 700; padding: 4px 10px; border-radius: 99px; }
    .status-pill.active { background: #dcfce7; color: #15803d; }
  `]
})
export class S3DashboardComponent {
  public regionChart: Partial<ChartOptions>;
  public bucketChart: Partial<ChartOptions>;

  constructor() {
    this.regionChart = {
      series: [{ name: "Storage (TB)", data: [1.2, 0.8, 1.5, 0.4, 1.1] }],
      chart: { height: 280, type: "bar", toolbar: { show: false }, fontFamily: 'Inter, sans-serif' },
      plotOptions: { bar: { borderRadius: 8, columnWidth: '45%', distributed: true } },
      dataLabels: { enabled: false },
      xaxis: { categories: ['US-East', 'EU-West', 'AP-South', 'SA-East', 'US-West'], axisBorder: { show: false } },
      fill: { opacity: 1 },
      grid: { borderColor: "#f1f5f9" },
      title: { text: "Storage by Region", style: { fontSize: "16px", fontWeight: "700" } }
    };

    this.bucketChart = {
      series: [{ name: "Objects (M)", data: [4.5, 8.2, 2.1, 5.8] }],
      chart: { height: 280, type: "bar", toolbar: { show: false }, fontFamily: 'Inter, sans-serif' },
      plotOptions: { bar: { borderRadius: 8, columnWidth: '45%', distributed: true } },
      dataLabels: { enabled: false },
      xaxis: { categories: ['Assets', 'Backups', 'Logs', 'Users'], axisBorder: { show: false } },
      fill: { colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'] },
      grid: { borderColor: "#f1f5f9" },
      title: { text: "Bucket distribution", style: { fontSize: "16px", fontWeight: "700" } }
    };
  }

  buckets = [
    { name: 'prod-enterprise-media', region: 'us-east-1', class: 'Standard', size: '850 GB', usage: 85 },
    { name: 'backup-archives-2024', region: 'eu-central-1', class: 'Glacier', size: '1.2 TB', usage: 40 },
    { name: 'temp-upload-cache', region: 'ap-south-1', class: 'S3 Standard', size: '120 GB', usage: 15 },
    { name: 'analytics-raw-data', region: 'us-west-2', class: 'Intelligent Tiering', size: '2.4 TB', usage: 65 }
  ];
}
