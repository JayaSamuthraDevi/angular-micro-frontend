import { Component, inject, ViewChild } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { DRJobListComponent } from '../components/dr-job-list.component';
import { DRMultizoneComponent } from '../components/dr-multizone.component';
import { HasPermissionDirective } from '@core/directives/has-permission.directive';
import { NgApexchartsModule, ChartComponent, ApexAxisChartSeries, ApexChart, ApexXAxis, ApexDataLabels, ApexTitleSubtitle, ApexStroke, ApexGrid, ApexTheme, ApexFill } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  theme: ApexTheme;
  fill: ApexFill;
};

@Component({
  selector: 'app-dr-dashboard',
  standalone: true,
  imports: [DRJobListComponent, DRMultizoneComponent, NgApexchartsModule, HasPermissionDirective],
  template: `
    <div class="dr-container">
      <header class="dr-header">
        <div class="header-main">
          <h2>Disaster Recovery Control</h2>
          <p class="subtitle">Global replication status and failover management</p>
        </div>
        <div class="header-actions" *appHasPermission="'dr:multi-domain'">
          <button class="domain-btn">🛡️ Multizone Setup Enabled</button>
        </div>
      </header>

      <section class="metrics-grid">
        <div class="metric-card">
          <span class="label">Sync Health</span>
          <span class="value green">99.9%</span>
          <span class="subtext">All zones operational</span>
        </div>
        <div class="metric-card">
          <span class="label">RPO Target</span>
          <span class="value">5 min</span>
          <span class="subtext">Currently 1.4s (Meeting SLA)</span>
        </div>
        <div class="metric-card">
          <span class="label">Network Throughput</span>
          <span class="value">1.4 GB/s</span>
          <span class="subtext">Optimization active</span>
        </div>
      </section>

      <div class="charts-row">
        <div class="chart-container">
          <apx-chart
            [series]="lagChart.series!"
            [chart]="lagChart.chart!"
            [xaxis]="lagChart.xaxis!"
            [stroke]="lagChart.stroke!"
            [dataLabels]="lagChart.dataLabels!"
            [grid]="lagChart.grid!"
            [theme]="lagChart.theme!"
            [fill]="lagChart.fill!"
            [title]="lagChart.title!"
          ></apx-chart>
        </div>
        
        <div class="chart-container">
          <apx-chart
            [series]="volumeChart.series!"
            [chart]="volumeChart.chart!"
            [xaxis]="volumeChart.xaxis!"
            [stroke]="volumeChart.stroke!"
            [dataLabels]="volumeChart.dataLabels!"
            [grid]="volumeChart.grid!"
            [theme]="volumeChart.theme!"
            [fill]="volumeChart.fill!"
            [title]="volumeChart.title!"
          ></apx-chart>
        </div>
      </div>

      @defer (when auth.hasPermission('dr:multi-domain')) {
        <app-dr-multizone />
      } @placeholder (minimum 500ms) {
        <div class="placeholder-box">
          <span class="lock-icon">🔒</span>
          <span>Advanced Multizone Configuration</span>
        </div>
      } @loading (minimum 1s; after 100ms) {
        <div class="skeleton-box">
          <div class="skeleton-header"></div>
          <div class="skeleton-lines"></div>
        </div>
      } @error {
        <div class="error-box">
          ⚠️ Failed to load Multizone Security Module
        </div>
      }

      @defer (on viewport) {
        <app-dr-job-list [jobs]="jobs" />
      } @placeholder {
        <div class="skeleton-table">
          <div class="skeleton-row header"></div>
          <div class="skeleton-row"></div>
          <div class="skeleton-row"></div>
          <div class="skeleton-row"></div>
        </div>
      }
    </div>
  `,
  styles: [`
    .dr-container { padding: 32px; font-family: 'Inter', sans-serif; background: #fdfdfd; min-height: 100vh; }
    .dr-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
    .dr-header h2 { margin: 0; font-size: 2rem; color: #0f172a; font-weight: 800; letter-spacing: -0.025em; }
    .subtitle { color: #64748b; margin-top: 4px; font-size: 1rem; }
    
    .domain-btn { background: #eff6ff; border: 1px solid #dbeafe; color: #1e40af; padding: 10px 18px; border-radius: 10px; font-weight: 700; font-size: 0.85rem; }

    .metrics-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 32px; }
    .metric-card { background: white; border: 1px solid #e2e8f0; padding: 24px; border-radius: 20px; transition: all 0.3s; }
    .metric-card:hover { border-color: #3b82f6; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05); }
    .metric-card .label { font-size: 0.75rem; color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
    .metric-card .value { font-size: 2rem; font-weight: 800; color: #0f172a; display: block; margin: 12px 0 4px 0; }
    .metric-card .subtext { font-size: 0.85rem; color: #94a3b8; font-weight: 500; }
    .value.green { color: #10b981; }

    .charts-row { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 32px; width: 100% }
    .chart-container { background: white; border: 1px solid #e2e8f0; padding: 20px; border-radius: 20px; box-shadow: 0 1px 2px rgba(0,0,0,0.05); }

    /* Defer Loading Styles */
    .placeholder-box { background: #f8fafc; border: 2px dashed #cbd5e1; border-radius: 20px; height: 200px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #64748b; gap: 12px; margin-bottom: 32px; }
    .lock-icon { font-size: 2rem; background: #e2e8f0; width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 50%; }
    
    .skeleton-box { background: #f1f5f9; border-radius: 20px; height: 200px; padding: 24px; animation: pulse 1.5s infinite; margin-bottom: 32px; }
    .skeleton-header { height: 30px; width: 40%; background: #e2e8f0; border-radius: 6px; margin-bottom: 20px; }
    .skeleton-lines { height: 100px; background: #e2e8f0; border-radius: 12px; }
    
    .error-box { background: #fee2e2; color: #b91c1c; padding: 20px; border-radius: 12px; text-align: center; border: 1px solid #fca5a5; font-weight: 600; margin-bottom: 32px; }

    .skeleton-table { background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; }
    .skeleton-row { height: 40px; background: #f1f5f9; margin-bottom: 12px; border-radius: 6px; animation: pulse 1.5s infinite; }
    .skeleton-row.header { height: 48px; background: #e2e8f0; margin-bottom: 16px; }

    @keyframes pulse {
      0% { opacity: 1; }
      50% { opacity: 0.5; }
      100% { opacity: 1; }
    }
  `]
})
export class DRDashboardComponent {
  protected auth = inject(AuthService);

  @ViewChild("chart") chart!: ChartComponent;
  public lagChart: Partial<ChartOptions>;
  public volumeChart: Partial<ChartOptions>;

  constructor() {
    this.lagChart = {
      series: [
        { name: "Sync Lag (ms)", data: [120, 150, 420, 310, 190, 140, 110] }
      ],
      chart: { height: 250, type: "area", toolbar: { show: false }, zoom: { enabled: false }, fontFamily: 'Inter, sans-serif' },
      dataLabels: { enabled: false },
      stroke: { curve: "smooth", width: 3, colors: ["#3b82f6"] },
      fill: { type: "gradient", gradient: { shadeIntensity: 1, opacityFrom: 0.45, opacityTo: 0.05, stops: [20, 100] } },
      xaxis: { categories: ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00"], axisBorder: { show: false }, axisTicks: { show: false } },
      grid: { borderColor: "#f1f5f9", strokeDashArray: 4 },
      title: { text: "Replication Lag (RPO)", style: { fontSize: "16px", fontWeight: "700", color: "#1e293b" } },
      theme: { mode: "light" }
    };

    this.volumeChart = {
      series: [
        { name: "Traffic (GB)", data: [44, 55, 57, 56, 61, 58, 63] }
      ],
      chart: { height: 250, type: "bar", toolbar: { show: false }, fontFamily: 'Inter, sans-serif' },
      dataLabels: { enabled: false },
      stroke: { show: true, width: 2, colors: ["transparent"] },
      xaxis: { categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], axisBorder: { show: false }, axisTicks: { show: false } },
      fill: { opacity: 1, colors: ["#2563eb"], type: 'solid' },
      grid: { borderColor: "#f1f5f9", strokeDashArray: 4 },
      title: { text: "Replication Volume", style: { fontSize: "16px", fontWeight: "700", color: "#1e293b" } }
    };
  }

  jobs = [
    { id: 1, source: 'NYC-DC-01', dest: 'NJ-DC-DR', type: 'Async-Mirror', status: 'Healthy' },
    { id: 2, source: 'LDN-DC-02', dest: 'AMS-DC-DR', type: 'Sync-Replication', status: 'Healthy' },
    { id: 3, source: 'SGP-DC-01', dest: 'BKK-DC-DR', type: 'Journaling', status: 'Lagging' }
  ];
}
