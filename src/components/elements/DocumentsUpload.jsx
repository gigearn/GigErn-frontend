import React, { useState, useRef } from 'react';
import Icon from './Icon';
import Button from './Button';

const DocumentUpload = ({
  label = 'Upload Document',
  description = 'Drag and drop or click to browse',
  acceptedFormats = '.pdf,.jpg,.jpeg,.png',
  maxSize = 5,
  required = false,
  error = '',
  onUpload,
  existingDocument = null,
  documentType = 'general',
  expiryDate = null,
  verificationStatus = null,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(existingDocument);
  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsDragging(false);

    const files = e?.dataTransfer?.files;
    if (files && files?.length > 0) {
      handleFileUpload(files?.[0]);
    }
  };

  const handleFileSelect = (e) => {
    const files = e?.target?.files;
    if (files && files?.length > 0) {
      handleFileUpload(files?.[0]);
    }
  };

  const handleFileUpload = (file) => {
    const fileSizeMB = file?.size / (1024 * 1024);
    if (fileSizeMB > maxSize) {
      alert(`File size exceeds ${maxSize}MB limit`);
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          const uploadedDoc = {
            name: file?.name,
            size: fileSizeMB?.toFixed(2),
            type: file?.type,
            uploadDate: new Date()?.toISOString(),
          };
          setUploadedFile(uploadedDoc);
          if (onUpload) {
            onUpload(file);
          }
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setUploadProgress(0);
    if (fileInputRef?.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleBrowseClick = () => {
    fileInputRef?.current?.click();
  };

  const getVerificationBadge = () => {
    if (!verificationStatus) return null;

    const statusConfig = {
      verified: { icon: 'CheckCircle2', color: 'text-success', bg: 'bg-success/10', label: 'Verified' },
      pending: { icon: 'Clock', color: 'text-warning', bg: 'bg-warning/10', label: 'Pending Review' },
      rejected: { icon: 'XCircle', color: 'text-error', bg: 'bg-error/10', label: 'Rejected' },
    };

    const config = statusConfig?.[verificationStatus];
    if (!config) return null;

    return (
      <div className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium ${config?.bg} ${config?.color}`}>
        <Icon name={config?.icon} size={16} />
        <span>{config?.label}</span>
      </div>
    );
  };

  const isExpiringSoon = () => {
    if (!expiryDate) return false;
    const expiry = new Date(expiryDate);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
  };

  const isExpired = () => {
    if (!expiryDate) return false;
    const expiry = new Date(expiryDate);
    const today = new Date();
    return expiry < today;
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">
          {label}
          {required && <span className="ml-1 text-error">*</span>}
        </label>
        {getVerificationBadge()}
      </div>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {!uploadedFile ? (
        <div
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleBrowseClick}
          className={`relative cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-all duration-250 ${
            isDragging
              ? 'border-primary bg-primary/5'
              : error
              ? 'border-error bg-error/5' :'border-border bg-muted/30 hover:border-primary hover:bg-primary/5'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={acceptedFormats}
            onChange={handleFileSelect}
            className="hidden"
          />

          <div className="flex flex-col items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Icon name="Upload" size={24} color="var(--color-primary)" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                {isDragging ? 'Drop file here' : 'Drag and drop or click to browse'}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Accepted formats: {acceptedFormats?.replace(/\./g, '')?.toUpperCase()} (Max {maxSize}MB)
              </p>
            </div>
          </div>

          {isUploading && (
            <div className="mt-4">
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-primary transition-all duration-250"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">Uploading... {uploadProgress}%</p>
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Icon name="FileText" size={20} color="var(--color-primary)" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{uploadedFile?.name}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {uploadedFile?.size} MB • Uploaded {new Date(uploadedFile.uploadDate)?.toLocaleDateString()}
                </p>
                {expiryDate && (
                  <p className={`text-xs mt-1 ${isExpired() ? 'text-error' : isExpiringSoon() ? 'text-warning' : 'text-muted-foreground'}`}>
                    {isExpired() ? 'Expired' : 'Expires'}: {new Date(expiryDate)?.toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRemoveFile}
              className="text-muted-foreground hover:text-error"
            >
              <Icon name="X" size={18} />
            </Button>
          </div>
        </div>
      )}
      {error && (
        <p className="text-sm text-error flex items-center gap-2">
          <Icon name="AlertCircle" size={16} />
          {error}
        </p>
      )}
    </div>
  );
};

export default DocumentUpload;